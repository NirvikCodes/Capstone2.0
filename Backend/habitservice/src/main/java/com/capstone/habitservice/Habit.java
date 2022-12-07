package com.capstone.habitservice;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "Habits")
public class Habit  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer habitId;
    private int timesperweek;
    private String name;
    private boolean iscompleted;


    @ElementCollection
    private List<String> daysperweek = new ArrayList<>();
    private int userid;

    public Habit(int habitId, int timesperweek, String name, boolean iscompleted, ArrayList<String> daysperweek, int userid) {
        this.habitId = habitId;
        this.timesperweek = timesperweek;
        this.name = name;
        this.iscompleted = iscompleted;
        this.daysperweek = daysperweek;
        this.userid = userid;
    }

    public Habit(){};

    public int getHabitId() {
        return habitId;
    }

    public void setHabitId(int habitId) {
        this.habitId = habitId;
    }

    public int getTimesperweek() {
        return timesperweek;
    }

    public void setTimesperweek(int timesperweek) {
        this.timesperweek = timesperweek;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isIscompleted() {
        return iscompleted;
    }

    public void setIscompleted(boolean iscompleted) {
        this.iscompleted = iscompleted;
    }

    public List<String> getDaysperweek() {
        return daysperweek;
    }

    public void setDaysperweek(ArrayList<String> daysperweek) {
        this.daysperweek = daysperweek;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }


}
