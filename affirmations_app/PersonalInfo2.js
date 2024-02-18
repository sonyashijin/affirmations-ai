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
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TextInput
        style={styles.input}
        placeholder='Name'
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        placeholderTextColor="#A9A9A9"
      />
      <Text style={styles.label}>What are your most important values?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Honestly, family, etc"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#A9A9A9"
      />
      <Text style={styles.label}>Who are some of the people you care most about in your life?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Fiancee, children, best friends, etc"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#A9A9A9"
      />
            <Text style={styles.label}>What are your big life goals? Dreams?</Text>
      <TextInput
        style={{...styles.input, height:200, textAlignVertical: 'top',}}
        placeholder="Getting a college degree, financial stability, etc"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#A9A9A9"
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
        borderColor: 'rgba(255, 255, 255, 0.2)', // Slightly visible border
        padding: 10,
        borderRadius: 20, // Rounded edges
        backgroundColor: '#303030', // Dark mode background for the input
        color: '#fff', // Text color
        shadowColor: '#303030', // Glowing border effect (subtle)
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5, // This adds a shadow on Android
      },
      label: {
        color: '#fff', // Light colored text for visibility
        margin: 12,
        marginBottom: 0,
        marginLeft: 12, // Align left margin with the input fields
        marginRight: 12, // Align right margin for consistency
      },
    buttonContainer: {
      margin: 12,
      borderRadius: 10, // Optional: if you want rounded edges on your button
    },
    buttonTitle: {
      color: '#FFF', // Button text color
    },
    container: {
      flex: 1,
      backgroundColor: '#303030',
      paddingTop: 20, // Add padding at the top for overall spacing from the screen edge
      paddingBottom: 20, // Add padding at the bottom for scrolling space
    },
  });

export default PersonalInfoScreen;
