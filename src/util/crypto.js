const CryptoJS = require('crypto-js');
const { SECRET_KEY } = require('./constants');

function decodeUrlSafeBase64(urlSafeBase64) {
    // Replace URL-safe characters with standard Base64 characters.
    let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if necessary (Base64 string length should be a multiple of 4).
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    
    // Decode the Base64 string to get the original data.
    return base64;
  }
  

const decrypt = (data, urlSafe = false) => {
    var parts = data.split(':');
    if (parts.length !== 2) {
        console.error('Unexpected format for encrypted data. Expected "iv:ciphertext".');
    } else {
        var ivBase64 = parts[0];
        var ciphertextBase64 = parts[1];

        if( urlSafe){
            ivBase64 = decodeUrlSafeBase64(parts[0]);
            ciphertextBase64 = decodeUrlSafeBase64(parts[1]);
        }
        
        console.log('iv:', ivBase64, 'ciphertext:', ciphertextBase64);
        var iv = CryptoJS.enc.Base64.parse(ivBase64);
        var ciphertext = CryptoJS.enc.Base64.parse(ciphertextBase64);

        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: ciphertext
        });

        // Retrieve the secret key from the environment variable
        if (!SECRET_KEY) {
            console.error("The secret_key environment variable is not set.");
        } else {
            var key = CryptoJS.enc.Base64.parse(SECRET_KEY);

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

        const key = CryptoJS.enc.Base64.parse(SECRET_KEY);
        const iv = CryptoJS.lib.WordArray.random(16);

        const encrypted = CryptoJS.AES.encrypt(json, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const ivBase64 = iv.toString(CryptoJS.enc.Base64);
        const ciphertextBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

        const payload = ivBase64 + ":" + ciphertextBase64;
        return payload
    }
}


module.exports = { decrypt, encrypt }