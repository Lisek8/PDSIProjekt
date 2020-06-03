package com.backend.db.Message;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String author;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime date;
    private String content;
    private int conversation_id;
    private boolean is_read;

    public Message(){

    }

    public Message(String author, String content, int conversation_id) {
        this.author = author;
        this.content = content;
        this.conversation_id = conversation_id;
        this.date = LocalDateTime.now();
        this.is_read=false;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String line_text) {
        this.content = line_text;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    @JsonIgnore
    @JsonProperty(value = "conversation_id")
    public int getConversation_id() {
        return conversation_id;
    }

    public void setConversation_id(int conversation_id) {
        this.conversation_id = conversation_id;
    }

    @JsonIgnore
    @JsonProperty(value = "is_read")
    public boolean isIs_read() {
        return is_read;
    }

    public void setIs_read(boolean is_read) {
        this.is_read = is_read;
    }
}
