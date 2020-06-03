package com.backend.Json;

import com.backend.db.Message.Message;

import java.util.List;

public class ConversationFull {
    private int id;
    private int topicId;
    private String topic;
    private String student;
    private String lecturer;
    private int unreadMessages;
    private List<Message> messages;

    public ConversationFull(int id, int topicId, String topic, String student, String lecturer, int unreadMessages, List<Message>messages) {
        this.id = id;
        this.topicId = topicId;
        this.topic = topic;
        this.student = student;
        this.lecturer = lecturer;
        this.unreadMessages = unreadMessages;
        this.messages = messages;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public int getUnreadMessages() {
        return unreadMessages;
    }

    public void setUnreadMessages(int unreadMessages) {
        this.unreadMessages = unreadMessages;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
