import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import headshot from './assets/headshot.png'; // Adjust the path if your file structure is different

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  // Example functions for menu options
  const handleAdjustFeedback = () => {
    console.log('Adjust Feedback pressed');
    // Navigation or action to adjust feedback
  };

  const handleAddEditEvents = () => {
    console.log('Add/Edit Events pressed');
    // Navigation or action to add/edit events
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Circular Headshot */}
        <Image
          source={headshot}
          style={styles.headshot}
        />
        {/* Menu Options */}
        <TouchableOpacity style={styles.menuButton} onPress={handleAdjustFeedback}>
          <Text style={styles.menuText}>Adjust Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleAddEditEvents}>
          <Text style={styles.menuText}>Add/Edit Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headshot: {
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // Equal width and height for a circle
    borderRadius: width * 0.2, // Half of width or height to make it circular
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#333333', // Dark mode friendly button color
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: width * 0.8, // 80% of screen width
    alignItems: 'center',
  },
  menuText: {
    color: '#FFFFFF', // White text for dark mode
    fontSize: 16,
  },
});

export default ProfilePage;
