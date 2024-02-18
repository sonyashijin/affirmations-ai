import React, { useState } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button, Icon, ListItem, Divider } from '@ui-kitten/components';

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

  const MicIcon = (props) => (
    <Icon {...props} name='mic-outline' />
  );
  
  const SendIcon = (props) => (
    <Icon {...props} name='paper-plane-outline' />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessageItem}
        ItemSeparatorComponent={Divider}
      />
      <View style={styles.inputContainer}>
        <Button
        style={styles.iconButton}
        accessoryLeft={MicIcon} // Pass the function that returns the icon component
        onPressIn={handleVoiceInput}
        onPressOut={sendMessage}
        />

        <Button
        style={styles.iconButton}
        accessoryLeft={SendIcon} // Pass the function that returns the icon component
        onPress={sendMessage}
        />
        <Input
          placeholder="Type your message..."
          style={styles.inputField}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  inputField: {
    flex: 1,
    marginRight: 10,
  },
  iconButton: {
    width: 50,
    borderRadius: 25,
  },
});
