import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoiceInputSection from './VoiceInputSection';

const ChatBubble = () => {
  const [currentTime, setCurrentTime] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <LinearGradient
          colors={['#7018f9', '#534ffa']} // Blue to purple gradient
          style={styles.gradientBubble}>
          <Text style={styles.person}>Inspira AI</Text>
          <Text style={styles.body}>What's on your mind?</Text>
          <Text style={styles.time}>{currentTime}</Text>
        </LinearGradient>
      </View>
      <VoiceInputSection />
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
  messageContainer: {
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
});

export default ChatBubble;


