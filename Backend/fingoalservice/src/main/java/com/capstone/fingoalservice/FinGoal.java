package com.capstone.fingoalservice;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="FinGoal")
public class FinGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer finGoalId;

    private String GoalName;

    private double amountToSave;

    private double amountToSetAside;

    private Date timeFrame;

    private boolean isCompleted;

    private int userId;

    public FinGoal(){};

    public FinGoal(Integer finGoalId, String goalName, double amountToSave, double amountToSetAside, Date timeFrame, boolean isCompleted, int userId) {
        this.finGoalId = finGoalId;
        GoalName = goalName;
        this.amountToSave = amountToSave;
        this.amountToSetAside = amountToSetAside;
        this.timeFrame = timeFrame;
        this.isCompleted = isCompleted;
        this.userId = userId;
    }

    public Integer getFinGoalId() {
        return finGoalId;
    }

    public void setFinGoalId(Integer finGoalId) {
        this.finGoalId = finGoalId;
    }

    public String getGoalName() {
        return GoalName;
    }

    public void setGoalName(String goalName) {
        GoalName = goalName;
    }

    public double getAmountToSave() {
        return amountToSave;
    }

    public void setAmountToSave(double amountToSave) {
        this.amountToSave = amountToSave;
    }

    public double getAmountToSetAside() {
        return amountToSetAside;
    }

    public void setAmountToSetAside(double amountToSetAside) {
        this.amountToSetAside = amountToSetAside;
    }

    public Date getTimeFrame() {
        return timeFrame;
    }

    public void setTimeFrame(Date timeFrame) {
        this.timeFrame = timeFrame;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
