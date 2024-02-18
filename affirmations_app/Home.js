import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

const tasks = [
  // Replace with your tasks
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
  // ... (more tasks)
];

const events = [
  // Replace with your events
  { id: 1, title: 'Midterm' },
  // ... (more events)
];

const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update date every second

    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hours = currentDate.getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const renderTaskItem = (task) => (
    <View key={task.id} style={styles.taskItem}>
      <Text style={styles.taskTitle}>{task.title}</Text>
    </View>
  );

  const renderEventItem = (event) => (
    <View key={event.id} style={styles.eventItem}>
      <Text style={styles.eventTitle}>{event.title}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('./assets/background2.png')} style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksCount}>{tasks.length} tasks</Text>
        </View>
        <Text style={styles.greeting}>{greeting()}, Sonya</Text>
      </View>
      <View style={styles.glassPanel}>
        <View style={styles.widgetPanel}>
          <Text style={styles.widgetTitle}>Upcoming Event:</Text>
          <Text style={styles.widgetText}>{events[0].title}</Text>
        </View>
        {/* Add more widget panels here */}
      </View>
      <View style={styles.textBoxContainer}>
        <TouchableOpacity style={styles.textBox}>
          <Image source={require('./assets/siri.gif')} style={styles.siriIcon} />
          <Text style={styles.textBoxText}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileAndChat}>
        <TouchableOpacity>
          <Image
            source={require('./assets/headshot.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Image source={require('./assets/chatIcon.png')} style={styles.chatIcon} />
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // Replace with actual gradient background:
      // rbackgroundColor: LinearGradient.colors(['#f5f5f5', '#f0f0f0']), // Example gradient
    },
    topSection: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tasksHeader: {
      marginBottom: 10,
    },
    tasksCount: {
      fontSize: 12,
      color: '#ccc',
    },
    greeting: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    glassPanel: {
      flex: 0.5,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 20, // Adjust as needed
      margin: 20,
      padding: 10,
    },
    widgetPanel: {
      marginBottom: 15,
      borderRadius: 10, // Adjust as needed
      padding: 10,
    },
    widgetTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    widgetText: {
      fontSize: 14,
    },
    textBoxContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 20, // Adjust as needed
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: 350,
    },
    siriIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    textBoxText: {
      fontSize: 15,
      color: '#ccc',
    },
    profileAndChat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      
      paddingHorizontal: 20,
    },
    profileIcon: {
      
      width: 30,
      height: 30,
      borderRadius: 50,
    },

  });
  
  export default HomeScreen;