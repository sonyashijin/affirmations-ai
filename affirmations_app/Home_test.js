import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatInterface = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const userMessage = inputText.trim();
    if (!userMessage) return; // Prevent sending empty messages

    // Display user message immediately
    setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: userMessage, sender: 'user' }]);
    setInputText(''); // Clear input field

    // Prepare data for the API call
    const data = { text: userMessage };
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
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  },
  leftBubble: {
    alignSelf: 'flex-start',
  },
  gradientBubble: {
    borderRadius: 20,
    padding: 15,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatInterface;
