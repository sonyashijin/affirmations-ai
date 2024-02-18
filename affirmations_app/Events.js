import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from "galio-framework";
import { Card } from 'react-native-elements';

const { width } = Dimensions.get("window");

const EventCard = ({ props }) => {
  return (
    <Card containerStyle={styles.eventCard}>
      <Card.Title style={styles.eventTitle}>{props.title}</Card.Title>
      <Text style={styles.eventText}>{props.description}</Text>
      <Text style={styles.eventText}>{props.repeat} at {props.datetime}</Text>
      <Text style={styles.eventText}>{props.medium}</Text>
      <Text style={styles.eventText}>{props.additionalInfo}</Text>
    </Card>
  );
};

const EventsScreen = () => {
  const [events, onChangeEvents] = React.useState([
    {
      title: "Cardio",
      description: "Cardio workout.",
      datetime: "2022-12-31, 12:00",
      medium: "text",
      additionalInfo: "motivate me",
      repeat: "weekly, monday wednesday friday"
    },
    {
      title: "Lifting weights",
      description: "We will be lifting weights at the gym. Please bring your own weights.",
      datetime: "2022-12-31, 12:00",
      medium: "text",
      additionalInfo: "motivate me",
      repeat: "weekly, monday wednesday friday"
    }
  ]);

  const [event, onChangeEvent] = React.useState({
    title: "Pitching at TreeHacks",
    description: "My team and I are about to give a pitch at TreeHacks for the project we just spent the last 36 hours working on.",
    datetime: "NOW",
    medium: "text",
    additionalInfo: "We really want to win this competition.",
    repeat: "once"
  });

  function updateEvent(event1, param){
    onChangeEvent({[param]: event1});
  }

  const EventCardEdit = () => {
    return (
      <Card containerStyle={styles.eventCard}>
        <TextInput
          value={event.title}
          onChangeText={(e) => updateEvent(e, "title")}
          style={styles.input}
        />
        <TextInput
          value={event.description}
          onChangeText={(e) => updateEvent(e, "description")}
          style={styles.input}
        />
        <TextInput
          value={event.repeat}
          onChangeText={(e) => updateEvent(e, "repeat")}
          style={styles.input}
        />
        <TextInput
          value={event.datetime}
          onChangeText={(e) => updateEvent(e, "datetime")}
          style={styles.input}
        />
        <TextInput
          value={event.medium}
          onChangeText={(e) => updateEvent(e, "medium")}
          style={styles.input}
        />
        <TextInput
          value={event.additionalInfo}
          onChangeText={(e) => updateEvent(e, "additionalInfo")}
          style={styles.input}
        />
      </Card>
    );
  };
  
  function add() {
    onChangeEvents([...events, event]);
    onChangeEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      medium: "",
      additionalInfo: ""
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Block flex style={styles.container}>
          <Text category="h2">Events</Text>
          {events.map((f, i) => <EventCard props={f} edit={false} key={i} />)}
          <EventCardEdit />
          <Button title="Add" style={styles.button} onPress={add}>Add feedback</Button>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK, // Dark mode background color
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10, // Add horizontal padding for better spacing
    paddingVertical: 20, // Add vertical padding for better spacing
  },
  container: {
    alignItems: 'center',
  },
  input: {
    marginVertical: 8, // Add margin for better spacing
    borderWidth: 1,
    borderColor: theme.COLORS.WHITE, // White border color for dark mode
    padding: 10,
    color: theme.COLORS.WHITE, // Text color for dark mode
  },
  button: {
    marginVertical: 8,
    minWidth: 200,
    backgroundColor: theme.COLORS.PRIMARY, // Primary button color for dark mode
    borderRadius: 50, // Rounded corners for the button
    justifyContent: 'center', // Center align button text
    alignItems: 'center', // Center align button text
  },
  buttonText: {
    color: theme.COLORS.WHITE, // White text color for dark mode
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventCard: {
    marginVertical: 8,
    backgroundColor: theme.COLORS.GRAY, // Gray background for event card
    padding: 10,
    borderRadius: 10, // Rounded corners for event card
  },
  eventTitle: {
    color: theme.COLORS.WHITE, // White text color for event title
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventText: {
    color: theme.COLORS.WHITE, // White text color for event details
    fontSize: 14,
  },
});

export default EventsScreen;
