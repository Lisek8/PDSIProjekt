package com.backend.db.AcceptanceRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcceptanceRequestRepo extends JpaRepository<AcceptanceRequest,Integer> {
    AcceptanceRequest findById(int id);
    List<AcceptanceRequest> findAllByTopicId(int id);
    AcceptanceRequest findByTopicIdAndStudentId(int topicId, int studentId);
}
