import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { DATE_DDMMYYYY_MASK } from "../../util/date";
import MaskInput from "react-native-mask-input";

const DateInput = ({ label, textInputConfig, style, error }: any) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <MaskInput
        mask={DATE_DDMMYYYY_MASK}
        style={styles.input}
        {...textInputConfig}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default DateInput;
