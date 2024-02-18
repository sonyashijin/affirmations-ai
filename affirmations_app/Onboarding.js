import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "./constants/Theme";
import Images from "./constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={60}>
                    Positive
                  </Text>
                </Block>
                <Block>
                  <Text color="white" size={60}>
                    Vibes.
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    Unlock your potential with personalized affirmations.
                  </Text>
                </Block>
              </Block>
              <Block center>
                {/* <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("PersonalInfo")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
    
                > */}

                  {/* Get Started
                </Button> */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonalInfo")}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4, // Assuming 'width' is defined elsewhere in your code
    height: theme.SIZES.BASE * 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Slight border for the glass effect
    alignItems: 'center', // Center text or content inside the button
    justifyContent: 'center',
    shadowColor: '#000', // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android to create shadow
  },
  logo: {
    width: 300,
    height: 100,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  buttonText: {
    color: '#FFFFFF', // Set text color to white
    fontSize: 16, // Example font size, adjust as needed
    fontWeight: 'bold', // Example font weight, adjust as needed
    // Add any other styling as needed for your button text
  },
  title: {
    marginLeft:'5%',
    marginTop:'-20%',
  },
  subTitle: {
    marginTop: 20,
    fontSize: 30,
  }
});

export default Onboarding;
