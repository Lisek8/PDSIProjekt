package com.backend.Json;

public class ConversationSimple {
    private int id;
    private int topicId;
    private String topic;
    private String student;
    private String lecturer;
    private int unreadMessages;

    public ConversationSimple(int id, int topicId, String topic, String student, String lecturer, int unreadMessages) {
        this.id = id;
        this.topicId = topicId;
        this.topic = topic;
        this.student = student;
        this.lecturer = lecturer;
        this.unreadMessages = unreadMessages;
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

}
