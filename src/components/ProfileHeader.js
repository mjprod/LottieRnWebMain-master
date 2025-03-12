import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts } from '../util/constants';

const ProfileHeader = ({ id, name, containerStyle }) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : ''}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.idText}>{id ? `ID: ${id}` : ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#3D3D3D',
  },
  avatarText: {
    fontFamily: Fonts.InterMedium,
    color: '#FFDEA8',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  idText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 8,
  },
});

export default ProfileHeader;