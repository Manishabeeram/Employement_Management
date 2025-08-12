import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, addEmployee, deleteEmployee, fetchEmployeesByLocation } from './employeeSlice';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const [newEmployee, setNewEmployee] = useState({ name: '', location: '' });
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.location) {
      dispatch(addEmployee(newEmployee));
      setNewEmployee({ name: '', location: '' });
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
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
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEmployee.location}
          onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
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
          <li key={emp.id}>
            {emp.name} ({emp.location})
            <button onClick={() => handleDeleteEmployee(emp.id)} style={{ marginLeft: '1em' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
