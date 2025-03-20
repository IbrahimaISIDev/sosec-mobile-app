import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseData } from '../../types/expense.types';

interface ExpenseState {
  expenses: ExpenseData[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseData>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<ExpenseData>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addExpense, 
  updateExpense, 
  deleteExpense, 
  setLoading, 
  setError 
} = expenseSlice.actions;

export default expenseSlice.reducer;