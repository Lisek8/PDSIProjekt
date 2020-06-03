package com.backend.db.Conversation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepo extends JpaRepository<Conversation,Integer> {
    Conversation findById(int id);
    Conversation findByStudentIdAndTopicId(int student_id,int topic_id);
    List<Conversation>findAllByStudentId(int id);
    List<Conversation> findAllByLecturerIdAndTopicId(int lecturer_id,int topic_id);
    List<Conversation>findAllByLecturerId(int id);
}
