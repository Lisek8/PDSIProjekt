package com.backend.Controllers;


import com.backend.db.Lecturer.Lecturer;
import com.backend.db.Lecturer.LecturerRepo;
import com.backend.db.Student.Student;
import com.backend.db.Student.StudentRepo;
import com.backend.db.User.User;
import com.backend.db.User.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest-services/AdminPanel")
public class AdminPanel {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepo userRepo;
    @Autowired
    StudentRepo studentRepo;
    @Autowired
    LecturerRepo lecturerRepo;


    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    void registerUser(User user) {
        if (userRepo.findByLogin(user.getLogin()).isPresent()) {
            throw new RuntimeException("User with that name already exists");
        }

        boolean isStudent;
        if (user.getUserType().equalsIgnoreCase("student")) isStudent = true;
        else if (user.getUserType().equalsIgnoreCase("lecturer")) isStudent = false;
        else {
            throw new RuntimeException("Wrong User Type");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        if (isStudent)
            studentRepo.save(new Student(user.getName(), user.getSurname(), user.getFaculty(), user.getId()));
        else lecturerRepo.save(new Lecturer(user.getName() + " " + user.getSurname(), user.getId()));
    }


}



