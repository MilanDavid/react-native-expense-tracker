import React, { useContext } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { ErrorMessage, Field, Formik } from "formik";
import { GlobalStyles } from "../../constants/styles";
import { ExpensesContext } from "../../store/expenses-context";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";
import moment from "moment";
import DateInput from "./DateInput";
import Input from "./Input";
import * as Yup from "yup";

const ExpenseForm = ({ id, isEditing, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editExpense = expensesCtx.expenses.find((expense) => expense.id === id);

  const initialValues = {
    amount: editExpense ? String(editExpense.amount) : "",
    date: editExpense
      ? String(moment.unix(editExpense.date).format("DD.MM.YYYY"))
      : "",
    title: editExpense ? String(editExpense.title) : "",
  };

  const validationScheme = Yup.object().shape({
    amount: Yup.number()
      .positive("Number must be positive")
      .required("Amount is required")
      .typeError("Invalid input"),
    date: Yup.string()
      .matches(/^\d{2}\.\d{2}\.\d{4}$/, "Invalid date format (DD/MM/YYYY)")
      .required("Date is required")
      .typeError("Invalid date format"),
    title: Yup.string()
      .max(50, "Title is too long!")
      .required("Your title is required")
      .typeError("Invalid input"),
  });

  const submitFormHandler = (values) => {
    if (isEditing) {
      expensesCtx.updateExpense(id, {
        title: values.title,
        amount: Number(values.amount),
        date: moment(values.date, "DD.MM.YYYY").unix(),
      });
    } else {
      expensesCtx.addExpense({
        title: values.title,
        amount: Number(values.amount),
        date: moment(values.date, "DD.MM.YYYY").unix(),
      });
    }
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(id);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationScheme}
      validateOnMount={true}
      onSubmit={(values) => {
        submitFormHandler(values);
      }}
    >
      {({ isValid, handleSubmit, values, handleChange, errors }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
              <Input
                name="amount"
                label="Amount"
                textInputConfig={{
                  keyboardType: "numeric",
                  value: values.amount.replace(",", "."),
                  onChangeText: handleChange("amount"),
                }}
                error={errors.amount}
                style={styles.rowInput}
              />
              <DateInput
                name="date"
                label="Date"
                textInputConfig={{
                  keyboardType: "decimal-pad",
                  value: values.date,
                  onChangeText: handleChange("date"),
                }}
                error={errors.date}
                style={styles.rowInput}
              />
              <ErrorMessage name="date" />
            </View>
            <Input
              name="title"
              label="Title"
              textInputConfig={{
                multiline: true,
                value: values.title,
                onChangeText: handleChange("title"),
              }}
              error={errors.title}
            />
            <View style={styles.buttonsContainer}>
              <Button mode="flat" onPress={cancelHandler} style={styles.button}>
                Cancel
              </Button>
              <PaperButton
                mode="contained"
                onPress={() => handleSubmit()}
                disabled={!isValid}
                style={[styles.button, !isValid && styles.disabledButton]}
              >
                {isEditing ? "Update" : "Add"}
              </PaperButton>
            </View>
            {isEditing && (
              <View style={styles.deleteContainer}>
                <IconButton
                  icon="trash"
                  size={36}
                  color={GlobalStyles.colors.error500}
                  onPress={deleteExpenseHandler}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: GlobalStyles.colors.primary200,
  },
});

export default ExpenseForm;
