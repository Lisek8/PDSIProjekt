package com.backend.db.Message;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Integer> {
    List<Message> findAllByConversationIdAndIsRead(int id, boolean isRead);
    @Transactional void deleteAllByConversationId(int id);
}
