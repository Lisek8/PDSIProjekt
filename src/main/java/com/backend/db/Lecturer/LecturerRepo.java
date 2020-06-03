package com.backend.db.Lecturer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerRepo extends JpaRepository<Lecturer,Integer> {
    Lecturer findById(int id);
    Lecturer findByName(String name);
    Lecturer findByUserId(int id);
}
