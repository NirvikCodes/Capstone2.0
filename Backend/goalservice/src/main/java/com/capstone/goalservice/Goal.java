package com.capstone.goalservice;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer goalId;

    private String completionDate;

    private boolean isCompleted;

    @OneToMany(cascade = {CascadeType.ALL})
    private List<ToDo> steps = new ArrayList<>();

    private int userId;

    private String goalName;

    public Goal(){}

    public Goal(Integer goalId, String completionDate, boolean isCompleted, List<ToDo> steps, int userId, String goalName) {
        this.goalId = goalId;
        this.completionDate = completionDate;
        this.isCompleted = isCompleted;
        this.steps = steps;
        this.userId = userId;
        this.goalName = goalName;
    }

    public Integer getGoalId() {
        return goalId;
    }

    public void setGoalId(Integer goalId) {
        this.goalId = goalId;
    }

    public String getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(String completionDate) {
        this.completionDate = completionDate;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public List<ToDo> getSteps() {
        return steps;
    }

    public void setSteps(List<ToDo> steps) {
        this.steps = steps;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }
}
