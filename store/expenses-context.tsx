import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: 1684447200,
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: 1684447200,
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: 1684447200,
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: 1684447200,
  },
  {
    id: "e5",
    title: "Toilet Paper",
    amount: 94.12,
    date: 1684447200,
  },
  {
    id: "e6",
    title: "New TV",
    amount: 799.49,
    date: 1684447200,
  },
  {
    id: "e7",
    title: "Car Insurance",
    amount: 294.67,
    date: 1684447200,
  },
  {
    id: "e8",
    title: "New Desk (Wooden)",
    amount: 450,
    date: 1684447200,
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ title, amount, date }) => {},
  deleteExpense: (expenseId: string) => {},
  updateExpense: (expenseId: string, { title, amount, date }) => {},
});

const expensesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [
        ...state,
        {
          id: Math.random().toString(),
          title: action.payload.title,
          amount: action.payload.amount,
          date: action.payload.date,
        },
      ];
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
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD_EXPENSE", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
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
