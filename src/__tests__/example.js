import React, { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

// Test the settings
// ================================================
describe("Example", () => {
  it("works", () => {
    expect(1).toBe(1);
  });
});

// Test query
// ================================================
const Greeting = ({ name }) => {
  return (
    <View>
      <Text testID="greetingText">Hello {name}!</Text>
    </View>
  );
};

describe("Greeting", () => {
  it("renders a greeting message based on the name prop", () => {
    const { debug: _debug, getByTestId } = render(<Greeting name="Minh" />);
    // _debug();
    expect(getByTestId("greetingText")).toHaveTextContent("Hello Minh!");
  });
});

// Test firing event
// ================================================
const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(username, password);
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
          testID="usernameField"
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          testID="passwordField"
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={handleSubmit} testID="submitButton">
          <Text>Submit</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

describe("Form", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId("usernameField"), "kalle");
    fireEvent.changeText(getByTestId("passwordField"), "password");
    fireEvent.press(getByTestId("submitButton"));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual("kalle");
    expect(onSubmit.mock.calls[0][1]).toEqual("password");
  });
});