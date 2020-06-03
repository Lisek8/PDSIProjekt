package com.backend.Json;

import com.backend.db.Type;

public class TopicDataSimple {
    private int id;
    private String faculty;
    private String lecturer;
    private Type type;
    private String topic;
    private String description;
    private String[] tags;

    public TopicDataSimple(int id, String faculty, String lecturer, Type type, String topic, String description, String tags) {
        this.id = id;
        this.faculty = faculty;
        this.lecturer = lecturer;
        this.type = type;
        this.topic = topic;
        this.description = description;
        this.tags = tags.split(",");
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }
}
