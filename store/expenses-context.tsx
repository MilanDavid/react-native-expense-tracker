import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ id, title, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (expenseId: string) => {},
  updateExpense: (expenseId: string, { title, amount, date }) => {},
});

const expensesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];
    case "DELETE_EXPENSE":
      return state.filter((expense: any) => expense.id !== action.payload);
    case "UPDATE_EXPENSE":
      return state.map((expense: any) => {
        if (expense.id === action.payload.id) {
          return {
            ...expense,
            title: action.payload.data.title,
            amount: action.payload.data.amount,
            date: action.payload.data.date,
          };
        }
        return expense;
      });
    case "SET_EXPENSES":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD_EXPENSE", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET_EXPENSES", payload: expenses });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id: id, data: expenseData },
    });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
