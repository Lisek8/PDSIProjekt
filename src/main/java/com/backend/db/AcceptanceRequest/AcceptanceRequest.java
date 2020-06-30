package com.backend.db.AcceptanceRequest;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="acceptance_request")
public class AcceptanceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="topic_id")
    private int topicId;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime date;
    @Column(name="student_id")
    private int studentId;

    public AcceptanceRequest(){

    }

    public AcceptanceRequest(int topicId, int studentId){
        this.topicId = topicId;
        this.date = LocalDateTime.now();
        this.studentId = studentId;
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

    public void setTopicId(int topic_id) {
        this.topicId = topic_id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int student_id) {
        this.studentId = student_id;
    }
}
