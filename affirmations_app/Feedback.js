import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, ScrollView, Text as NativeText, TouchableOpacity, Dimensions } from 'react-native';
import { Block, Button, theme } from "galio-framework";
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Block flex style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <NativeText style={styles.backButtonText}>Back</NativeText>
          </TouchableOpacity>

          <Text style={styles.title}>Are there any rules you want us to follow?</Text>
          {feedback.map((f, i) => <Text style={styles.feedbackText} key={i}>{f}</Text>)}
          <TextInput
            value={cfeedback}
            onChangeText={onChangeCFeedback}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
          />
          <Button title="Add feedback" style={styles.button} onPress={addFeedback}>Add feedback</Button>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 3,
  },
  container: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: theme.SIZES.BASE,
    left: theme.SIZES.BASE,
    zIndex: 2,
  },
  backButtonText: {
    color: theme.COLORS.WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
  },
  input: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 1,
    borderColor: theme.COLORS.WHITE,
    padding: theme.SIZES.BASE,
    height: 100,
    textAlignVertical: 'top',
    color: theme.COLORS.WHITE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    marginTop: theme.SIZES.BASE * 2,
  },
  feedbackText: {
    color: theme.COLORS.WHITE,
    marginBottom: theme.SIZES.BASE,
  },
});

export default FeedbackScreen;
