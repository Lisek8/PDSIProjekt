package com.backend.Json;

import java.time.LocalDateTime;

public class RequestSender {
    private int id;
    private int topic_id;
    private LocalDateTime date;
    private String student;

    public RequestSender(int id, int topic_id, LocalDateTime date, String student){
        this.id = id;
        this.topic_id = topic_id;
        this.date = date;
        this.student = student;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTopic_id() {
        return topic_id;
    }

    public void setTopic_id(int topic_id) {
        this.topic_id = topic_id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }
}
