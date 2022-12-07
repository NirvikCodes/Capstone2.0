package com.capstone.taskservice;

import javax.persistence.*;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Entity
@Table(name="Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer taskId;

    private String title;


    private Boolean isCompleted;

    private int userId;

    private String start;

    private String end;


    //**
    // final String OLD_FORMAT = "dd/MM/yyyy";
    //final String NEW_FORMAT = "yyyy/MM/dd";
    //
    //// August 12, 2010
    //String oldDateString = "12/08/2010";
    //String newDateString;
    //
    //SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
    //Date d = sdf.parse(oldDateString);
    //sdf.\
    // (NEW_FORMAT);
    //newDateString = sdf.format(d);
    //
    // */

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public Boolean getCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start)   {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end){
        this.end = end;
    }
}
