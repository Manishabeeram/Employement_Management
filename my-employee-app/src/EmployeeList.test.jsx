import '@testing-library/jest-dom';
/* global describe, it, expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import EmployeeList from './EmployeeList';

const initialState = {
  employees: {
    employees: [
      { id: 1, name: 'Alice', location: 'NY' },
      { id: 2, name: 'Bob', location: 'CA' }
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
    expect(screen.getByText('Alice (NY)')).toBeInTheDocument();
    expect(screen.getByText('Bob (CA)')).toBeInTheDocument();
  });

  it('can add an employee', () => {
    renderWithStore(<EmployeeList />);
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Charlie' } });
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'TX' } });
    fireEvent.click(screen.getByText('Add Employee'));
    // You would mock dispatch and check if addEmployee was called
  });

  it('can filter employees by location', () => {
    renderWithStore(<EmployeeList />);
    fireEvent.change(screen.getByPlaceholderText('Filter by location'), { target: { value: 'NY' } });
    fireEvent.click(screen.getByText('Filter'));
    // You would mock dispatch and check if fetchEmployeesByLocation was called
  });
});
