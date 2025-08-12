import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployeesByLocation = createAsyncThunk(
  'employees/fetchByLocation',
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/employees?location=${location}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/employees', employee);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/employees/${employeeId}`);
      return employeeId; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [], 
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeesByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; 
      })
      .addCase(fetchEmployeesByLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        console.log("Employee added successfully:", action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(employee => employee.employeeId !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Failed to delete employee:", action.payload);
      });
  },
});

export default employeeSlice.reducer;
