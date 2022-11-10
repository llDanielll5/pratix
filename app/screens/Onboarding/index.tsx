import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { HomeData } from "../../../data";
import { useNavigation } from "@react-navigation/native";
import OnboardingComponent from "react-native-onboarding-swiper";

const Onboarding = () => {
  const { navigate } = useNavigation();
  const Done = ({ ...props }) => (
    <TouchableOpacity style={styles.doneTouch} {...props}>
      <Text style={{ fontSize: 15, fontWeight: "600" }}>Estou pronto!</Text>
    </TouchableOpacity>
  );

  const Dots = ({ selected }: any) => {
    let backgroundColor;
    let opacity;
    let radius;
    let height;
    let width;
    backgroundColor = selected ? "#222" : "#666";
    opacity = selected ? 1 : 0.2;
    radius = selected ? 40 : 55;
    width = selected ? 14 : 6;
    height = 6;

    return (
      <View style={styles.dots(width, height, backgroundColor, opacity)} />
    );
  };

  const nextButtonComponent = (...props: any) => {
    return (
      <TouchableOpacity style={styles.onboardingButtonStyle} {...props}>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>Proxímo</Text>
      </TouchableOpacity>
    );
  };

  function finishOnboarding() {
    navigate("NotLogged");
  }
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <OnboardingComponent
        titleStyles={{ fontSize: 27, fontWeight: "800" }}
        DoneButtonComponent={Done}
        NextButtonComponent={nextButtonComponent}
        showNext={false}
        showSkip={false}
        DotComponent={(selected) => Dots(selected)}
        pages={HomeData}
        transitionAnimationDuration={250}
        onDone={finishOnboarding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dots: (
    width: number,
    height: number,
    backgroundColor: string,
    opacity: number
  ) => ({
    width: width,
    height: height,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: backgroundColor,
    opacity: opacity,
  }),
  doneTouch: {
    backgroundColor: "#fff",
    minWidth: 80,
    paddingHorizontal: 15,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 20,
  },
  onboardingButtonStyle: {
    backgroundColor: "#fff",
    minWidth: 80,
    paddingHorizontal: 15,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 20,
  },
});

export default Onboarding;
