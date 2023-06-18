import React, { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getExpenses } from "../util/http";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import moment from "moment";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState("");
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
    return expense.date > moment().subtract(7, "d").unix();
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setErrorOccured("Could not fetch expenses!");
      }
      setIsLoading(false);
    };

    fetchExpenses();
  }, []);

  const errorHandler = () => {
    setErrorOccured("");
  }

  if (isLoading) return <LoadingOverlay />;
  if (errorOccured && !isLoading) return <ErrorOverlay message={errorOccured} onConfirm={errorHandler} />;

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses found in the last 7 days."
    />
  );
};

export default RecentExpenses;
