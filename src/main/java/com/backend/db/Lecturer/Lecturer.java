package com.backend.db.Lecturer;

import javax.persistence.*;

@Entity
@Table(name="lecturer")
public class Lecturer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @Column(name="user_id")
    private int userId;
    public Lecturer(){

    }

    public Lecturer(String name, int userId){
        this.userId = userId;
        this.name=name;
    }

    @Override
    public String toString() {
        return "Lecturer{" +
               "id=" + id +
               ", name='" + name + '\'' +
               '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int user_id) {
        this.userId = user_id;
    }
}
