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
    @Column(name="conversation_id")
    private int conversationId;
    @Column(name="is_read")
    private boolean isRead;

    public Message(){

    }

    public Message(String author, String content, int conversationId) {
        this.author = author;
        this.content = content;
        this.conversationId = conversationId;
        this.date = LocalDateTime.now();
        this.isRead =false;
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
    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversation_id) {
        this.conversationId = conversation_id;
    }

    @JsonIgnore
    @JsonProperty(value = "is_read")
    public boolean isIsRead() {
        return isRead;
    }

    public void setIsRead(boolean is_read) {
        this.isRead = is_read;
    }
}
