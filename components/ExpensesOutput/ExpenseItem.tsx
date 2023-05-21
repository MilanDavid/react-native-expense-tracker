import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const ExpenseItem = ({ title, date, amount, id }) => {
  const navigation = useNavigation<any>();
  const expensePressHandler = () => {
    navigation.navigate("ManagedExpense", { expenseId: id });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.title, styles.textBase]}>{title}</Text>
          <Text style={styles.textBase}>
            {moment.unix(date).format("DD.MM.YYYY")}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ExpenseItem;
