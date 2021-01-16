import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Username"), "Minh");
      });
      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
      });
      await act(async () => {
        fireEvent.press(getByTestId("submitButton"));
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "Minh",
          password: "password"
        });
      });
    });
  });
});