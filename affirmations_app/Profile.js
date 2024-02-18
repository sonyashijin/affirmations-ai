import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    profilePic: require('./assets/headshot.png'), // Replace with actual path
  };

  return (
    <View style={styles.container}>
      <Image source={user.profilePic} style={styles.profilePic} />
      <Text style={styles.name}>{user.name}</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditPreference')}>
        <Text>Edit Preference Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SavedChats')}>
        <Text>Saved Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Rules')}>
        <Text>Rules</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
  },
});

export default ProfileScreen;
