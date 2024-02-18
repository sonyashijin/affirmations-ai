import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

export default function Taskbar({ onVoiceInput, onChatOpen }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon style={styles.icon} name='person-outline' fill='#555' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={onVoiceInput}>
        <Icon style={styles.icon} name='mic-outline' fill='#555' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={onChatOpen}>
        <Icon style={styles.icon} name='message-circle-outline' fill='#555' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    color: '#555',
  },
});
