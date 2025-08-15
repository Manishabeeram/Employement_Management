import '@testing-library/jest-dom';
/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import EmployeeList from './EmployeeList';

const initialState = {
  employees: {
    employees: [
      { employeeId: 1, firstName: 'Alice', lastName: 'Smith', location: 'NY' },
      { employeeId: 2, firstName: 'Bob', lastName: 'Brown', location: 'CA' }
    ],
    status: 'idle',
    error: null
  }
};

function renderWithStore(ui, state = initialState) {
  const store = configureStore({ reducer: { employees: employeeReducer }, preloadedState: state });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('EmployeeList', () => {
  it('renders employee list', () => {
    renderWithStore(<EmployeeList />);
    expect(screen.getByText('Employee List')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith - NY')).toBeInTheDocument();
    expect(screen.getByText('Bob Brown - CA')).toBeInTheDocument();
  });

  it('can add an employee', () => {
    renderWithStore(<EmployeeList />);
    screen.getByPlaceholderText('First Name');
    screen.getByPlaceholderText('Last Name');
    screen.getByPlaceholderText('Employee ID');
    screen.getByPlaceholderText('Location');
    // You can add fireEvent and mock dispatch for a full test
  });

  it('can filter employees by location', () => {
    renderWithStore(<EmployeeList />);
    screen.getByPlaceholderText('Filter by location');
    // You can add fireEvent and mock dispatch for a full test
  });
});
