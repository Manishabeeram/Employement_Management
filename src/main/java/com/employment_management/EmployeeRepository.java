package com.employment_management;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int addEmployee(Employee employee) {
        return jdbcTemplate.update("INSERT INTO employees (employee_id, first_name, last_name, location) VALUES (?, ?, ?, ?)",
            employee.getEmployeeId(), employee.getFirstName(), employee.getLastName(), employee.getLocation());
    }

    public List<Employee> findByLocation(String location) {
        return jdbcTemplate.query("SELECT * FROM employees WHERE location = ?",
            (rs, rowNum) -> {
                Employee emp = new Employee();
                emp.setEmployeeId(rs.getLong("employee_id"));
                emp.setFirstName(rs.getString("first_name"));
                emp.setLastName(rs.getString("last_name"));
                emp.setLocation(rs.getString("location"));
                return emp;
            }, location);
    }

    public int deleteEmployee(String employeeId) {
        return jdbcTemplate.update("DELETE FROM employees WHERE employee_id = ?", employeeId);
    }
}