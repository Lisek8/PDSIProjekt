package com.backend.Json;

import com.backend.db.Status;
import com.backend.db.Type;

public class TopicDataFull extends TopicDataPersonal {
    ConversationFull[] conversations;
    String arrangements;
    String[]files;
    RequestSender[] acceptanceRequests;
    public TopicDataFull(int id, String faculty, String lecturer, Type type, String topic, String description, String tags, Status status,
                         String student, int messages, String date, ConversationFull[]conversations, String arrangements, String files, RequestSender[]acceptanceRequests) {
        super(id, faculty, lecturer, type, topic, description, tags, status, student, messages, date);
        this.conversations = conversations;
        this.arrangements = arrangements;
        this.files = files.split(",");
        this.acceptanceRequests = acceptanceRequests;
    }

    public ConversationFull[] getConversations() {
        return conversations;
    }

    public void setConversations(ConversationFull[] conversations) {
        this.conversations = conversations;
    }

    public String getArrangements() {
        return arrangements;
    }

    public void setArrangements(String arrangements) {
        this.arrangements = arrangements;
    }

    public String[] getFiles() {
        return files;
    }

    public void setFiles(String[] files) {
        this.files = files;
    }

    public RequestSender[] getAcceptanceRequests() {
        return acceptanceRequests;
    }

    public void setAcceptanceRequests(RequestSender[] acceptanceRequests) {
        this.acceptanceRequests = acceptanceRequests;
    }
}
