import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors, Dimentions, Fonts } from '../util/constants';
import { useSnackbar } from './SnackbarContext';
import Avatar, { AvatarSize } from './Avatar';
import ResourceTile from './ResourceTile';

const ProfileHeader = ({ id, name, totalCards, containerStyle }) => {
  const { showSnackbar } = useSnackbar();
  const handleCopy = () => {
    if (id) {
      Clipboard.setString(`ID: ${id}`);
      showSnackbar("ID Copied!");
    }
  };

  return (
    <View style={{ ...containerStyle }}>
      <View style={{ ...styles.container }}>
        <Avatar size={AvatarSize.big} name={name} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.idText}>{id ? `ID: ${id}` : ""}</Text>
        </View>
        <Pressable onPress={handleCopy} style={styles.copyButton}>
          <ResourceTile number={totalCards} isBadge={true} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Dimentions.innerCardPadding,
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
  },
});

export default ProfileHeader;