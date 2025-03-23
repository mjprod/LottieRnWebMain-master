const CryptoJS = require('crypto-js');
const { SECRET_KEY } = require('./constants');



const decrypt = (data) => {
    var parts = data.split(':');
    if (parts.length !== 2) {
        console.error('Unexpected format for encrypted data. Expected "ivHex:ciphertextHex".');
    } else {
        var ivHex = parts[0];
        var ciphertextHex = parts[1];

        var iv = CryptoJS.enc.Hex.parse(ivHex);
        var ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);

        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: ciphertext
        });

        // Retrieve the secret key from the environment variable
        if (!SECRET_KEY) {
            console.error("The secret_key environment variable is not set.");
        } else {
            var key = CryptoJS.enc.Hex.parse(SECRET_KEY);

            var decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

            try {
                var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
                if (!plaintext) {
                    console.error("Decryption resulted in empty output. Check key/IV and encrypted data.");
                } else {
                    return plaintext;
                }
            } catch (e) {
                console.error("Error converting decrypted data to UTF-8 string:", e);
            }
        }
    }
}

const encrypt = (data) => {
    const json = JSON.stringify(data).trim();
    if (!SECRET_KEY) {
        console.error("The secret_key environment variable is not set.");
    } else {

        const key = CryptoJS.enc.Hex.parse(SECRET_KEY);
        const iv = CryptoJS.lib.WordArray.random(16);

        const encrypted = CryptoJS.AES.encrypt(json, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const ivHex = iv.toString(CryptoJS.enc.Hex);
        const ciphertextBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

        const payload = ivHex + ":" + ciphertextBase64;
        return payload
    }
}


module.exports = { decrypt, encrypt }