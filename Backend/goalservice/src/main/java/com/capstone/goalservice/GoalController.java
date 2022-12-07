package com.capstone.goalservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/goal")
public class  GoalController {

    @Autowired
    private GoalRepository gr;

    @Autowired ToDoRepository td;

    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createGoal(@RequestBody Goal goal){
        this.gr.save(goal);
        System.out.println("Goal Created");
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteGoal(@PathVariable(value = "id") int id){
        Goal goal = gr.findByGoalId(id);
        this.gr.delete(goal);
        System.out.println("Goal Deleted");
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Goal getGoal(@PathVariable(value = "id") int id){
        Goal goal = gr.findByGoalId(id);
        return goal;
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Goal[] getAllGoalsByUserId(@PathVariable(value = "id") int id){
        Goal[] goals = gr.findAllByUserId(id);
        return goals;
    }

    @GetMapping("/user/{id}/isCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Goal[] getCompletedGoals(@PathVariable(value = "id") int id){
        Goal[] goals = gr.findAllByisCompletedAndUserId(true,id);
        return goals;
    }

    @GetMapping("/user/{id}/isNotCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Goal[] getNotCompletedGoals(@PathVariable(value = "id") int id){
        Goal[] goals = gr.findAllByisCompletedAndUserId(false,id);
        return goals;
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void updateHabit(@PathVariable(value = "id") int id, @RequestBody Goal goal){
        Goal updateGoal = gr.findByGoalId(id);
        updateGoal.setGoalId(goal.getGoalId());
        updateGoal.setCompleted(goal.isCompleted());
        updateGoal.setCompletionDate(goal.getCompletionDate());
        updateGoal.setUserId(goal.getUserId());
        updateGoal.setSteps(goal.getSteps());
        gr.save(updateGoal);

        System.out.println("Goal Updated");
    }

    @GetMapping("/find/steps/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public ToDo findSteps(@PathVariable(value = "id") int id){
        ToDo toDos = td.findByToDoId(id);
        System.out.println("Step Found");
        return toDos;
    }

    @PostMapping("/update/task/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void updateTask(@PathVariable(value = "id") int id,  @RequestParam(value="completed", required = true, defaultValue = "false")
    boolean completed){
        ToDo toDo = td.findByToDoId(id);
        toDo.setCompleted(completed);
        td.save(toDo);
        System.out.println( "Task Updated");
    }
}
