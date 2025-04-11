import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors, Dimentions, Fonts } from '../util/constants';
import AssetPack from '../util/AssetsPack';
import { useSnackbar } from './SnackbarContext';
import Avatar, { AvatarSize } from './Avatar';

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
      <Avatar size={AvatarSize.big} name={name} />
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
    paddingVertical: Dimentions.innerCardPadding,
    borderBottomColor: Colors.jokerBlack200,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.jokerBlack200,
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