import React, { useState, useEffect } from 'react';

import { View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components' // Import the WidgetsPanel component


const VoiceInputSection = ({ onMessageSubmit }) => {
  const [input, setInput] = useState('');

  const handleEnter = () => {
    onMessageSubmit(input); // Call the callback with the input as argument
    setInput(''); // Reset input
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 20}
      style={styles.container}
    >
      {/* Include the WidgetsPanel component */}
      
      {/* Input text box and mic button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How are you doing?"
          placeholderTextColor="#9B9B9B"
          onSubmitEditing={handleEnter}
        />
        <TouchableOpacity style={styles.micButton}>
          <Icon name='mic-outline' fill='#9B9B9B' style={styles.micIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#3e3e42',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: '#212121',
    color: '#FFF',
  },
  micButton: {
    marginLeft: 10,
  },
  micIcon: {
    width: 24,
    height: 24,
  },

});

export default VoiceInputSection;
