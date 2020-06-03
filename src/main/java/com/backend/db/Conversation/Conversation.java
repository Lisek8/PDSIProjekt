package com.backend.db.Conversation;

import javax.persistence.*;

@Entity
@Table(name="conversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="topicId")
    private int topicId;
    @Column(name="student_id")
    private int studentId;
    @Column(name="lecturer_id")
    private int lecturerId;
    private int unread_messages;
    @Column(name="last_message_by_student")
    private boolean lastMessageByStudent;
    public Conversation(){

    }

    public Conversation(int topicId, int studentId, int lecturerId) {
        this.topicId = topicId;
        this.studentId = studentId;
        this.lecturerId = lecturerId;
        unread_messages = 0;
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

    public void setTopicId(int chat_id) {
        this.topicId = chat_id;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int student_id) {
        this.studentId = student_id;
    }

    public int getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(int lecturer_id) {
        this.lecturerId = lecturer_id;
    }

    public int getUnread_messages() {
        return unread_messages;
    }

    public void setUnread_messages(int unread_messages) {
        this.unread_messages = unread_messages;
    }

    public boolean isLastMessageByStudent() {
        return lastMessageByStudent;
    }

    public void setLastMessageByStudent(boolean lastMessageByStudent) {
        this.lastMessageByStudent = lastMessageByStudent;
    }
}
