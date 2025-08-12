package com.example.employeemanagement;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import com.employment_management.Employee;

@SpringBootTest(classes = com.manisha.employment_management.EmploymentManagementApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EmployeeControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void addEmployeeTest() {
        Employee employee = new Employee();
        employee.setEmployeeId(null); // Let H2 auto-generate
        employee.setFirstName("Jane");
        employee.setLastName("Doe");
        employee.setLocation("CA");

        ResponseEntity<Void> response = restTemplate.postForEntity(
            "http://localhost:" + port + "/api/employees", employee, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void filterEmployeesByLocationTest() {
        // Add two employees
        Employee emp1 = new Employee();
        emp1.setFirstName("Alice");
        emp1.setLastName("Smith");
        emp1.setLocation("NY");
        restTemplate.postForEntity("http://localhost:" + port + "/api/employees", emp1, Void.class);

        Employee emp2 = new Employee();
        emp2.setFirstName("Bob");
        emp2.setLastName("Brown");
        emp2.setLocation("CA");
        restTemplate.postForEntity("http://localhost:" + port + "/api/employees", emp2, Void.class);

        // Filter by location NY
        ResponseEntity<Employee[]> response = restTemplate.getForEntity(
            "http://localhost:" + port + "/api/employees?location=NY", Employee[].class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().length).isGreaterThanOrEqualTo(1);
        boolean foundNY = false;
        for (Employee e : response.getBody()) {
            if ("NY".equals(e.getLocation())) foundNY = true;
        }
        assertThat(foundNY).isTrue();
    }

    @Test
    void deleteEmployeeTest() {
        // Add an employee
        Employee emp = new Employee();
        emp.setFirstName("Charlie");
        emp.setLastName("Davis");
        emp.setLocation("TX");
        ResponseEntity<Void> addResp = restTemplate.postForEntity(
            "http://localhost:" + port + "/api/employees", emp, Void.class);
        assertThat(addResp.getStatusCode()).isEqualTo(HttpStatus.OK);

        // Get all employees
        ResponseEntity<Employee[]> getResp = restTemplate.getForEntity(
            "http://localhost:" + port + "/api/employees", Employee[].class);
        assertThat(getResp.getStatusCode()).isEqualTo(HttpStatus.OK);
        Employee[] employees = getResp.getBody();
        assertThat(employees).isNotNull();
        // Find the employee with name Charlie
        Employee toDelete = null;
        for (Employee e : employees) {
            if ("Charlie".equals(e.getFirstName())) {
                toDelete = e;
                break;
            }
        }
        assertThat(toDelete).isNotNull();
        // Delete
        restTemplate.delete("http://localhost:" + port + "/api/employees/" + toDelete.getEmployeeId());
        // Verify deletion
        ResponseEntity<Employee[]> afterDeleteResp = restTemplate.getForEntity(
            "http://localhost:" + port + "/api/employees", Employee[].class);
        boolean stillExists = false;
        for (Employee e : afterDeleteResp.getBody()) {
            if ("Charlie".equals(e.getFirstName())) {
                stillExists = true;
            }
        }
        assertThat(stillExists).isFalse();
    }
}
