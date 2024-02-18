import React, { useState } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Input, Button, Icon, ListItem, Divider } from '@ui-kitten/components';
import Taskbar from './Taskbar';

const screenHeight = Dimensions.get('window').height;

export default function HomeChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    // Add new message to the state
    setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'user' }]);
    setInputText('');
    // Here you could also handle sending the message to a backend or chat API
  };

  const handleVoiceInput = () => {
    // Here you would handle starting voice recording
    console.log('Start voice input');
  };

  const renderMessageItem = ({ item }) => (
    <ListItem title={item.text} />
  );

  const handleChatOpen = () => {
    console.log('Open chat');
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessageItem}
          ItemSeparatorComponent={Divider}
          style={styles.messagesContainer}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
          style={styles.inputContainer}
        >
          <Input
            placeholder="Type your message..."
            style={styles.inputField}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
          />
          <Button
            style={styles.sendButton}
            accessoryLeft={(props) => <Icon {...props} name='paper-plane-outline' />}
            onPress={sendMessage}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.taskbarContainer}>
        <Taskbar onVoiceInput={handleVoiceInput} onChatOpen={handleChatOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    flex: 1,
    paddingBottom: screenHeight / 8, // Adjust this value to move the Taskbar up
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputField: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  taskbarContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
