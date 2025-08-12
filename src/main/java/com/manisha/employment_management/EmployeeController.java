package com.manisha.employment_management;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void addEmployee(@RequestBody Employee employee) {
        employeeRepository.addEmployee(employee);
    }

    @GetMapping
    public List<Employee> getEmployeesByLocation(@RequestParam String location) {
        return employeeRepository.findByLocation(location);
    }

    @DeleteMapping("/{employeeId}")
    public void deleteEmployee(@PathVariable String employeeId) {
        employeeRepository.deleteEmployee(employeeId);
    }
}
