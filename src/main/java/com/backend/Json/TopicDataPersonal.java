package com.backend.Json;

import com.backend.db.Status;
import com.backend.db.Type;

public class TopicDataPersonal extends TopicDataSimple {
    Status status;
    String student;
    int messages;
    String date;

    public TopicDataPersonal(int id, String faculty, String lecturer, Type type, String topic,
                             String description, String tags, Status status, String student, int messages, String date) {
        super(id, faculty, lecturer, type, topic, description, tags);
        this.status=status;
        this.student=student;
        this.messages=messages;
        this.date=date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public int getMessages() {
        return messages;
    }

    public void setMessages(int messages) {
        this.messages = messages;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
