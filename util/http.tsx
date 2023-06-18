import axios, { AxiosResponse } from "axios";

const API_URL =
  "https://react-native-couse-56c80-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData: any): Promise<any> => {
  const response = await axios.post(API_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response: AxiosResponse<any> = await axios.get(
    API_URL + "/expenses.json"
  );

  const expenses: any = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      title: response.data[key].title,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id: string, expenseData: any) => {
  return axios.put(API_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(API_URL + `/expenses/${id}.json`);
};
