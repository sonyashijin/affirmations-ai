import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, ScrollView, Button } from 'react-native';
// If you're using react-navigation v5 or later, you would import the useNavigation hook
import { useNavigation } from '@react-navigation/native';

const PersonalInfoScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [values, setValues] = useState('');
  const [people, setPeople] = useState('');
  const [goals, setGoals] = useState('');

  // Import the navigation hook
  const navigation = useNavigation();

  // Function to check if all fields are filled out
  const allFieldsFilled = () => {
    return name && phoneNumber && email && age && values && people && goals;
  };

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

      <Button
          title="Go to Home"
          // Disable the button if not all fields are filled out
          onPress={() => {
            // Navigate to Home_dark screen
            navigation.navigate('Home_dark');
          }}
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
