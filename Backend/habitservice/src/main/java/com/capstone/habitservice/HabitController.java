package com.capstone.habitservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/habit")
public class HabitController {
    @Autowired
    private HabitRepository hr;


    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createHabit(@RequestBody Habit habit) {
        this.hr.save(habit);
        System.out.println("Habit Created");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteHabit(@PathVariable(value = "id") int id) {
        Habit habit = hr.findByHabitId(id);
        this.hr.delete(habit);
        System.out.println("Habit Deleted");
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit getHabit(@PathVariable(value = "id") int id) {
        Habit habit = hr.findByHabitId(id);
        return habit;

    }

    @GetMapping("/user/{id}")
    @ResponseStatus(code =HttpStatus.ACCEPTED)
    public Habit[] getAllHabitsByUserId(@PathVariable(value = "id") int id) {
        Habit[] habit = hr.findAllByUserid(id);
        return habit;
    }

    @GetMapping("/user/{id}/isCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit[] getCompletedHabits(@PathVariable(value = "id") int id){
        Habit[] habits = hr.findAllByIscompletedAndUserid(true,id);
        return habits;
    }

    @GetMapping("/user/{id}/isNotCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit[] getNotCompletedHabits(@PathVariable(value = "id") int id){
        Habit[] habits = hr.findAllByIscompletedAndUserid(false,id);
        return habits;
    }



    //update habit to completed
    @PostMapping("/user/habit/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit setHabitCompletedStatus(
            @PathVariable(value = "id") int id,
            @RequestParam(name = "isCompleted", defaultValue = "false") Boolean isCompleted){
        Habit habit = getHabit(id);
        System.out.println(habit);
        habit.setIscompleted(isCompleted);
        this.hr.save(habit);
        return habit;
    }

    @PostMapping("/{id}/daysPerWeek")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit updateHabitDaysPerWeek(
            @PathVariable(value = "id") int id,
            @RequestParam(name = "dayPerWeek") String dayPerWeek){
        Habit habit = getHabit(id);
        List<String> daysPerWeek = habit.getDaysperweek();
        daysPerWeek.add(dayPerWeek);
        habit.setDaysperweek(new ArrayList<>(daysPerWeek));
        this.hr.save(habit);
        return habit;
    }

    //remove habit
    @PostMapping("/{id}/removeDay")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit removeHabitDay(@PathVariable(value = "id") int id,
                                @RequestParam(name = "removeDay") String dayToRemove){
        Habit habit = getHabit(id);
        List<String> daysPerWeek = habit.getDaysperweek();
        daysPerWeek.remove(dayToRemove);
        habit.setDaysperweek(new ArrayList<>(daysPerWeek));
        this.hr.save(habit);
        return habit;
    }

    //reset task
    @PostMapping("/{id}/reset")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Habit[] resetHabit(@PathVariable(value = "id") int id){
        Habit[] habit = getAllHabitsByUserId(id);
        ArrayList<String> arr =new ArrayList<>();
        for (int i =0 ; i < habit.length;i++){
            habit[i].setDaysperweek(arr);
            this.hr.save(habit[i]);
        }
        return habit;
    }

    //if you need to do a habit three times that week to complete the habit (front end)
    //check the array count and if it is equal to or greater than three mark as completed (front end)
}
