import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import headshot from './assets/headshot.png'; // Adjust the path if your file structure is different
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  // Example functions for menu options
  const handleAdjustFeedback = () => {
    console.log('Adjust Feedback pressed');
    navigation.navigate('Feedback');
    
  };

  const handleAddEditEvents = () => {
    console.log('Add/Edit Events pressed');
    navigation.navigate('Events');
    // Navigation or action to add/edit events
  };

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        {/* Circular Headshot */}
        <Image
          source={headshot}
          style={styles.headshot}
        />
      </View>
      {/* Menu Options */}
      <TouchableOpacity style={styles.menuButton} onPress={handleAdjustFeedback}>
        <Text style={styles.menuText}>Adjust Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={handleAddEditEvents}>
        <Text style={styles.menuText}>Add/Edit Events</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  backButtonText: {
    color: '#FFFFFF', // White text for dark mode
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headshot: {
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // Equal width and height for a circle
    borderRadius: width * 0.2, // Half of width or height to make it circular
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

export default ProfileScreen;
