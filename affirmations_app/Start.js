import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Layout, Text, Button, Radio, RadioGroup } from '@ui-kitten/components';

const questions = [
  {
    question: "What's Your Focus?",
    answers: [
      "Personal Growth",
      "Stress Relief",
      "Positivity",
      "Success & Motivation",
    ],
  },

  {
    question: "What's Your Current State of Mind?",
    answers: [
      "Optimistic",
      "Anxious/Stressed",
      "Neutral",
      "Pessimistic",
    ],
  },

  {
    question: "What Areas of Life Are You Focusing On?",
    answers: [
      "Work/Career",
      "Relationships",
      "Self-Esteem",
      "Health & Wellness",
    ],
  },
  // Add more questions following the same structure
];

export default function Start({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('Completed Quiz', answers);
      navigation.navigate('Home');

    }
  };

  const onSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h4' style={{ marginBottom: 20 }}>
          {questions[currentIndex].question}
        </Text>
        <RadioGroup
          selectedIndex={answers[currentIndex]}
          onChange={onSelect}
          style={{ marginBottom: 20 }}>
          {questions[currentIndex].answers.map((answer, index) => (
            <Radio key={index}>{answer}</Radio>
          ))}
        </RadioGroup>
        <Button onPress={handleNext}>
          {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </ScrollView>
    </Layout>
  );
}
