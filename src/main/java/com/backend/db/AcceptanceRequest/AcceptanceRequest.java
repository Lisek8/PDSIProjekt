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
    private int student_id;

    public AcceptanceRequest(){

    }

    public AcceptanceRequest(int topicId, int student_id){
        this.topicId = topicId;
        this.date = LocalDateTime.now();
        this.student_id=student_id;
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

    public int getStudent_id() {
        return student_id;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }
}
