import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoiceInputSection from './VoiceInputSection';
import WidgetsPanel from './WidgetsPanel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ChatBubble = () => {
  const [currentTime, setCurrentTime] = useState('');
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const tempMessage = "This is a test message.";

  useEffect(() => {
    // Function to update the current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };

    updateTime(); // Initial time update

    // Update the time every minute
    const interval = setInterval(updateTime, 60000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleVoiceInputSubmit = (submittedMessage) => {
    console.log('Received message:', submittedMessage);
    setMessage(submittedMessage);
  };


  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Feedback')}>
        <Icon name="settings" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.leftMessageContainer}>
        <LinearGradient
          colors={['#7018f9', '#534ffa']}
          style={styles.gradientBubble}>
          <Text style={styles.person}>Inspira AI</Text>
          <Text style={styles.body}>What's on your mind?</Text>
          <Text style={styles.time}>{currentTime}</Text>
        </LinearGradient>
      </View>

      {/* VoiceInputSection with the onMessageSubmit prop */}
      <VoiceInputSection onMessageSubmit={handleVoiceInputSubmit} />

      {/* Display the right-aligned bubble if there is a message */}
      {message && (
        <View style={styles.rightBubble}>
          <Text style={styles.rightBubbleText}>{message}</Text>
        </View>
      )}
      {tempMessage && (
        <View style={styles.rightBubble}>
          <LinearGradient
            // Here you should reverse the gradient colors to flip the effect
            colors={['#534ffa', '#7018f9']}
            style={{ borderRadius: 30, borderTopRightRadius: 0 }}>
            <Text style={styles.rightBubbleText}>{message}</Text>
          </LinearGradient>
        </View>
      )}

      {/* WidgetsPanel component */}
      <WidgetsPanel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Change to 'flex-start' to align items at the top
    alignItems: 'flex-start', // Aligns the bubble to the left
    backgroundColor: '#3e3e42', // Dark mode background
    paddingHorizontal: 30, // Added padding for overall container
    paddingTop: 100, 
  },
  leftMessageContainer: {
    maxWidth: '80%', // Ensure bubble doesn't stretch too wide
  },
  gradientBubble: {
    padding: 20,
    borderRadius: 30,
    borderBottomLeftRadius: 0, // Optional: adjust to match your design preference
  },
  person: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10, // Adds some space between the person's name and the body
  },
  body: {
    color: '#FFF',
  },
  time: {
    textAlign: 'right',
    color: '#FFF',
    marginTop: 5, // Adds some space above the time
  },
  settingsIcon: {
    position: 'absolute', // Position over the other elements
    right: 30, // Distance from the right edge
    top: 30, // Distance from the top edge
  },
  linearGradient: {
    flex: 1, // Ensures the gradient fills the container
    padding: 20, // Match the padding of the bubble for consistent text placement
    borderRadius: 30, // Ensures the gradient follows the bubble's rounded corners
    // No need for shadow or elevation here since it's applied to the bubble itself
  },

  rightBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#534ffa', // This will be overridden by the LinearGradient
    borderRadius: 30,
    borderBottomRightRadius: 1, // Flipped "speech tail"
    padding: 20,

    maxWidth: '80%',
    minWidth: '50%',
    
    // For iOS to create a shadow as a border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // For Android
    elevation: 2,
  },
  rightBubbleText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ChatBubble;


