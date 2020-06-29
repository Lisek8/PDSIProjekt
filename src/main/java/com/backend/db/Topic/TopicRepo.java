package com.backend.db.Topic;

import com.backend.db.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepo  extends JpaRepository<Topic,Integer> {
    Topic findById(int id);
    List<Topic> findAllByStudentId(int id);
    List<Topic> findAllByLecturerId(int id);
    List<Topic> findAllByStatusAndLecturerId(String status, int id);
}
