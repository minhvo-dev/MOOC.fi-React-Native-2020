// This component can be created by using "react-native-picker"
// or "Menu" component of React Native Paper library.
// However, I couldn't implement these since there was an
// incompatible issue and my phone didn't load the component.

import * as React from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import theme from "../../theme";
import Subheading from "../Subheading";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    padding: theme.spacing.small,
    margin: theme.spacing.small,
    backgroundColor: "white",
    borderRadius: theme.borderRadius.normal,
    borderColor: theme.colors.primary
  },
  buttonLabel: {
    color: theme.colors.primary,
    textAlign: "center"
  },
  buttonActive: {
    backgroundColor: theme.colors.primary
  },
  buttonLabelActive: {
    color: "white"
  }
});

const MenuItem = ({ onPress, label, active }) => {
  const buttonStyle = [
    styles.button,
    active && styles.buttonActive
  ];
  const labelStyle = [
    styles.buttonLabel,
    active && styles.buttonLabelActive
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View accessibilityRole="button" style={buttonStyle}>
        <Subheading style={labelStyle}>{label}</Subheading>
      </View>
    </TouchableWithoutFeedback>
  );
};

const OrderMenu = ({ options, setOption, selected }) => {
  const onChange = (option) => {
    setOption(option);
  };

  const containerStyle = [styles.container];

  return (
    <View style={containerStyle}>
      <ScrollView horizontal>
        {options.map(option =>
          <MenuItem
            key={option.id}
            onPress={() => onChange(option)}
            label={option.label}
            active={option.label === selected.label}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default OrderMenu;