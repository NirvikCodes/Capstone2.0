
package com.capstone.loanservice;

import javax.persistence.Entity;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Loan")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer loanId;

    private String loanName;

    private String loanType;

    private double loanAmount;

    private double interest;

    private Date interestStart;

    private boolean isStarted;

    private boolean isCompleted;

    private int userId;

    public Loan(){}

    public Loan(Integer loanId, String loanName, String loanType, double loanAmount, double interest, Date interestStart, Boolean isStarted, boolean isCompleted, int userId) {
        this.loanId = loanId;
        this.loanName = loanName;
        this.loanType = loanType;
        this.loanAmount = loanAmount;
        this.interest = interest;
        this.interestStart = interestStart;
        this.isStarted = isStarted;
        this.isCompleted = isCompleted;
        this.userId = userId;
    }

    public Integer getLoanId() {
        return loanId;
    }

    public void setLoanId(Integer loanId) {
        this.loanId = loanId;
    }

    public String getLoanName() {
        return loanName;
    }

    public void setLoanName(String loanName) {
        this.loanName = loanName;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getInterest() {
        return interest;
    }

    public void setInterest(double interest) {
        this.interest = interest;
    }

    public Date getInterestStart() {
        return interestStart;
    }

    public void setInterestStart(Date interestStart) {
        this.interestStart = interestStart;
    }

    public Boolean getIsStarted() {
        return isStarted;
    }

    public void setIsStarted(Boolean isStarted) {
        this.isStarted = isStarted;
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

    @Override
    public String toString() {
        return "Loan{" +
                "loanId=" + loanId +
                ", loanName='" + loanName + '\'' +
                ", loanType='" + loanType + '\'' +
                ", loanAmount=" + loanAmount +
                ", interest=" + interest +
                ", interestStart=" + interestStart +
                ", isStarted=" + isStarted +
                ", isCompleted=" + isCompleted +
                ", userId=" + userId +
                '}';
    }
}




