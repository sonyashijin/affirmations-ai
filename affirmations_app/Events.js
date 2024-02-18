import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, ScrollView, KeyboardAwareScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "./constants/Theme";
import {Card} from 'react-native-elements';
const { width, height } = Dimensions.get("window");
const EventCard = ({ props }) => {
  return <Card style={{margin: 10}}>
    
    <Card.Title>{props.title}</Card.Title>
    <Text>{props.description}</Text>
    <Text>{props.repeat} at {props.datetime}</Text>
    <Text>{props.medium}</Text>
    <Text>{props.additionalInfo}</Text>
    </Card>;
};

const EventsScreen = () => {
  const [events, onChangeEvents] = React.useState([{
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
  }]);
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
    return <Card style={{margin: 10}}>
      <TextInput value={event.title} onChangeText={(e) => {
        updateEvent(e, "title");
       }}/>
      <TextInput value={event.description} onChangeText={(e) => {
        updateEvent(e, "description");
       }}/>
<TextInput value={event.repeat} onChangeText={(e) => {
        updateEvent(e, "repeat");
       }}/>
       <TextInput value={event.datetime} onChangeText={(e) => {
        updateEvent(e, "datetime");
       }}/>
       <TextInput value={event.medium} onChangeText={(e) => {
        updateEvent(e, "medium");
       }}/>
       <TextInput value={event.additionalInfo} onChangeText={(e) => {
        updateEvent(e, "additionalInfo");
       }}/>
      </Card>;
  };
  
  function add() {
    onChangeEvents([...events, event]);
    onChangeEvent({title: "", description: "", date: "", time: "", medium: "", additionalInfo: ""});
  }
  return (
    <SafeAreaView>
      <ScrollView >
      <Block flex style={styles.container}>
        <Text category="h2">Events</Text>
        {
          events.map((f, i) => {
            return <EventCard props={f} edit={false} key={i}/>
          })
        }
        <EventCardEdit />
        <Button title="Add" style={styles.button} onPress={add}>Add feedback</Button>
        </Block>
        </ScrollView>
    </SafeAreaView>

  );
};

// const styles = StyleSheet.create({
//   input: {
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     height:80, textAlignVertical: 'top'
//   },
//   label: {
//     margin: 12,
//     marginBottom: 0,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   layout: {
//     flex: 1,
//     width: width,
//     height: height,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: 'center',
// },
// button: {
//     marginVertical: 8,
//     minWidth: 200,
// }
  
// });
const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.COLORS.BLACK,
    // color: theme.COLORS.WHITE,
  },
    input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height:80, textAlignVertical: 'top',
    color: theme.COLORS.WHITE
  },

  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 300,
    height: 100,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});
export default EventsScreen;