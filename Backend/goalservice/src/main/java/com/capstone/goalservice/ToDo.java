package com.capstone.goalservice;

import javax.persistence.*;

@Entity
@Table(name="toDo")
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer toDoId;

    private boolean completed = false;

    private String task;

    public ToDo(Integer toDoId, boolean completed, String task) {
        this.toDoId = toDoId;

        this.completed = completed;
        this.task = task;
    }

    public ToDo() {
    }

    public Integer getToDoId() {
        return toDoId;
    }

    public void setToDoId(Integer toDoId) {
        this.toDoId = toDoId;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }
}
