import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer, // This assigns employeeReducer to the 'employees' slice of store
  },
});