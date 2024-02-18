import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text, ScrollView, KeyboardAwareScrollView} from 'react-native';

const PersonalInfoScreen = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <ScrollView>
      <TextInput
        style={styles.input}
        placeholder='Name'
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
      />
      <Text style={styles.label}>What are your most important values?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Honestly, family, etc"
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.label}>Who are some of the people you care most about in your life?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Fiancee, children, best friends, etc"
        multiline={true}
        numberOfLines={4}
      />
            <Text style={styles.label}>What are your big life goals? Dreams?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Getting a college degree, financial stability, etc"
        multiline={true}
        numberOfLines={4}
      />
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    margin: 12,
    marginBottom: 0,
  }
});

export default PersonalInfoScreen;