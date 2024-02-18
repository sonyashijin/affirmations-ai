import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WidgetsPanel = () => {
  return (
    <View style={styles.container}>
      {/* Upcoming Events */}
      <View style={[styles.widgetContainer, styles.upcomingEvents]}>
        <Text style={styles.widgetTitle}>Upcoming Events</Text>
        {/* Add your calendar integration here */}
      </View>
      
      {/* To-Do List */}
      <View style={[styles.widgetContainer, styles.toDoList]}>
        <Text style={styles.widgetTitle}>To-Do List</Text>
        {/* Add your to-do list here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 200, // Position at the bottom of the screen
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%', // Take up the full width of the screen
    },
    widgetContainer: {
      width: '48%', // Adjust the width to fit your design
      padding: 10,
      height: 100,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass panel background
    },
    widgetTitle: {
      fontSize: 15,
      fontWeight: 'semi-bold',
      color: '#FFF',
      marginBottom: 10,
      textAlign: 'center',
    },
    upcomingEvents: {
      marginLeft: '7%',
      marginRight: '10%'
      // Add styles specific to the upcoming events widget
    },
    toDoList: {

      // Add styles specific to the to-do list widget
    },
  });
  
  export default WidgetsPanel;