package com.backend.db.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo  extends JpaRepository<Student,Integer> {
    Student findById(int id);
    Student findByNameAndSurname(String name, String surname);
    Student findByUserId(int id);
}
