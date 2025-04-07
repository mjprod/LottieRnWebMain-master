import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors, Dimentions, Fonts } from '../util/constants';
import AssetPack from '../util/AssetsPack';
import { useSnackbar } from './SnackbarContext';

const ProfileHeader = ({ id, name, containerStyle }) => {
  const { showSnackbar } = useSnackbar()
  const handleCopy = () => {
    if (id) {
      Clipboard.setString(`ID: ${id}`);
      showSnackbar("ID Copied!")
    }
  };

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : '?'}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.idText}>{id ? `ID: ${id}` : ""}</Text>
      </View>
      <Pressable onPress={handleCopy} style={styles.copyButton}>
        <Image style={{ height: 22, width: 22, marginRight: Dimentions.marginM }} source={AssetPack.icons.COPY} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomColor: Colors.jokerBlack200,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.jokerBlack200,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: Colors.jokerBlack800,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.jokerBlack200,
  },
  avatarText: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerGold400,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    paddingTop: 3,
  },
  username: {
    fontFamily: Fonts.InterSemiBold,
    color: Colors.jokerWhite50,
    fontSize: 16,
  },
  idText: {
    fontFamily: Fonts.InterSemiBold,
    color: Colors.jokerBlack50,
    fontSize: 14,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 8,
  },
  copyButton: {
    justifyContent: "center",
    width: 56,
    height: 56
  }
});

export default ProfileHeader;