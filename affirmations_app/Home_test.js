import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from './convex/_generated/api';
import { useRoute } from '@react-navigation/native';

const ChatInterface = () => {
  const route = useRoute();
  const userInfo = route.params?.userInfo;
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  

  console.log(userInfo);

  const [recording, setRecording] = useState();

  const uploadRecording = useAction(api.recordings.uploadRecording);
  const getCompletion = useAction(api.recordings.getCompletion);
  const getVoiceCompletion = useAction(api.recordings.getVoiceCompletion);

  const readFileAsBlob = async (fileUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const blob = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        return blob;
      } else {
        throw new Error('File does not exist');
      }
    } catch (error) {
      console.error('Error reading file as blob:', error);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording...');

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      setRecording(recording);

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');

    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    console.log('Recording stopped and stored at', uri);

    console.log("Moving file");
    const fileName = `recording-${Date.now()}.m4a`;

    // Move the recording to the new directory with the new file name
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
    await FileSystem.moveAsync({
      from: uri,
      to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
    });
    const newUri = FileSystem.documentDirectory + 'recordings/' + `${fileName}`;

    console.log("Now at:", newUri);

    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync({ uri: newUri });
    await playbackObject.playAsync();

    // Upload recording file to Convex
    console.log('Trying to upload file to Convex');

    const base64String = await readFileAsBlob(newUri);
    const storageId = await uploadRecording({ name: "Recording-" + Date.now(), base64String });

    console.log("Filed stored at storage id", storageId);
  };

  const handleSendMessage = async () => {
    const userMessage = inputText.trim();
    const fullMessage = userInfo ? `${userMessage} <sep> UserInfo: ${userInfo}` : userMessage;

    if (!userMessage) return; // Prevent sending empty messages

    // Display user message immediately
    setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: userMessage, sender: 'user' }]);
    setInputText(''); // Clear input field

    // Prepare data for the API call
    const data = { text: fullMessage };
    console.log(data);
    try {
      const response = await fetch("https://tmychow--sts-web.modal.run/text_response", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData)
      // Display API response
      setMessages(prevMessages => [...prevMessages, { id: Date.now() + 1, text: responseData.text, sender: 'api' }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleVoiceMessage = async () => {
    if(recording) {
      stopRecording();

      // Remove placeholder
      setMessages(messages.slice(0, messages.length - 1));
    } else {
      // Add a placeholder message
      setMessages([...messages, { id: Date.now(), text: "Speak your truth...", sender: "user" }])

      // Do voice logic
      startRecording()
    }
  }

  useEffect(() => {
    return recording ? stopRecording : undefined;
  }, [recording]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={message.id} style={[styles.messageBubble, message.sender === 'user' ? styles.rightBubble : styles.leftBubble]}>
            <LinearGradient
              colors={message.sender === 'user' ? ['#ff512f', '#dd2476'] : ['#7018f9', '#534ffa']}
              style={styles.gradientBubble}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.messageText}>{message.text}</Text>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type your message here..."
          placeholderTextColor="#999"
          onSubmitEditing={handleSendMessage} // Call handleSendMessage when the submit button is pressed
          returnKeyType="send" // Optional: changes the return key to indicate sending a message
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Icon name="send" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVoiceMessage}>
          <Icon name="mic" size={24} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
  },
  iconContainer: {
    justifyContent: 'center', // Centers the icon vertically if needed
    height: '100%', // Ensure the touchable area is the same height as the input container
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  rightBubble: {
    alignSelf: 'flex-end',
    marginRight: 10, // Ensures padding from the right edge
  },
  leftBubble: {
    alignSelf: 'flex-start',
    marginLeft: 10, // Ensures padding from the left edge
  },
  gradientBubble: {
    borderRadius: 20,
    padding: 15,
  },
  messageText: {
    color: '#fff', // Text color for dark mode
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    bottom: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Darker shade for the input area
    borderTopWidth: 1,
    alignItems: 'center',
    borderColor: '#333', // Slight border for the input area
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#333', // Dark input field
    color: '#fff', // Text input color for dark mode
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
});


export default ChatInterface;
