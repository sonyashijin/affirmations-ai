import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, ScrollView, Text as NativeText, KeyboardAwareScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "./constants/Theme";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");


const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [feedback, onChangeFeedback] = React.useState([]);
  const [cfeedback, onChangeCFeedback] = React.useState("When writing about lifting weights, write using all capital letters.");
  function addFeedback() {
    console.log("Adding feedback");
    onChangeFeedback([...feedback, cfeedback]);
    onChangeCFeedback("");
  }
  return (
    <SafeAreaView>
      <ScrollView >
      <Block flex style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <NativeText style={styles.backButtonText}>Back</NativeText>
          </TouchableOpacity>

        <Text category="h2">Are there any rules you want us to follow?</Text>
        {
          feedback.map((f, i) => {
            return <Text style={styles.input} key={i}>{f}</Text>
          })
        }
        <TextInput value={cfeedback} onChangeText={onChangeCFeedback}  style={{...styles.input, height:80, textAlignVertical: 'top',}}
        multiline={true}
        numberOfLines={4}
 />
        <Button title="Add feedback" style={styles.button} onPress={addFeedback}>Add feedback</Button>
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
    backgroundColor: theme.COLORS.BLACK,
    color: theme.COLORS.WHITE,
  },
  backButton: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButtonText: {
    color: theme.COLORS.WHITE,
    // Add additional styling for the back button text if needed
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
export default FeedbackScreen;