package com.backend.db.Topic;

import com.backend.db.Status;
import com.backend.db.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String faculty;
    @Column(name="student_id")
    private Integer studentId;
    @Column(name="lecturer_id")
    private int lecturerId;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String topic;
    private String description;
    private String tags;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String arrangements;
    private String files;
    @Column(columnDefinition = "DATE")
    private Date date;
    public Topic(){

    }

    public Topic(String faculty, int lecturerId, Type type, String topic, String description, String tags){
        this.faculty=faculty;
        this.studentId =null;
        this.lecturerId = lecturerId;
        this.type=type;
        this.topic=topic;
        this.description=description;
        this.tags=tags;
        this.status=Status.Available;
        this.arrangements="";
        this.files="";
    }

    public Topic(String faculty, int lecturerId, Type type, String topic, String description, String tags, String arrangements, String files, Date date){
        this.faculty=faculty;
        this.studentId =null;
        this.lecturerId = lecturerId;
        this.type=type;
        this.topic=topic;
        this.description=description;
        this.tags=tags;
        this.status=Status.Available;
        this.arrangements = arrangements;
        this.files = files;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @JsonIgnore
    @JsonProperty(value = "student_id")
    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer student_id) {
        this.studentId = student_id;
    }

    public int getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(int lecturer_id) {
        this.lecturerId = lecturer_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String title) {
        this.topic = title;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getArrangements() {
        return arrangements;
    }

    public void setArrangements(String arrangements) {
        this.arrangements = arrangements;
    }

    public String getFiles() {
        return files;
    }

    public void setFiles(String files) {
        this.files = files;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
