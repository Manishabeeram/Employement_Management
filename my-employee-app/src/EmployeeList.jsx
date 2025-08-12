import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, addEmployee, deleteEmployee, fetchEmployeesByLocation } from './employeeSlice';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', employeeId: '', location: '' });
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (newEmployee.firstName && newEmployee.lastName && newEmployee.employeeId && newEmployee.location) {
      dispatch(addEmployee(newEmployee)).then(() => {
        dispatch(fetchEmployees());
        setNewEmployee({ firstName: '', lastName: '', employeeId: '', location: '' });
      });
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      dispatch(fetchEmployees());
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(fetchEmployeesByLocation(filterLocation));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="First Name"
          value={newEmployee.firstName}
          onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newEmployee.lastName}
          onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Employee ID"
          value={newEmployee.employeeId}
          onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEmployee.location}
          onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
      <form onSubmit={handleFilter} style={{ marginTop: '1em' }}>
        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {employees.map((emp) => (
          <li key={emp.employeeId}>
            {emp.firstName} {emp.lastName} - {emp.location}
            <button onClick={() => handleDeleteEmployee(emp.employeeId)} style={{ marginLeft: '1em' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
