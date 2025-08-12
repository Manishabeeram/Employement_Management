package com.employment_management;

import lombok.Data;

@Data
public class Employee {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String location;
}
