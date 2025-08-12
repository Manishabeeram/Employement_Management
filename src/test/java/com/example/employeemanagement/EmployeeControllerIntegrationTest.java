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
}
