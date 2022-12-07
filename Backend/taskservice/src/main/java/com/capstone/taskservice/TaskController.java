package com.capstone.taskservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskRepository tr;

    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createTask(@RequestBody Task task){
        this.tr.save(task);
        System.out.println("Task Created");
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteTask(@PathVariable(value = "id") int id){
        Task task = tr.findByTaskId(id);
        this.tr.delete(task);
        System.out.println("Task Deleted");
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Task getTask(@PathVariable(value = "id") int id){
        return tr.findByTaskId(id);
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Task[] getAllTaskByUserId(@PathVariable(value = "id") int id){
        Task[] task = tr.findAllByUserId(id);
        return task;
    }

    @GetMapping("/user/{id}/isCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Task[] getCompletedTask(@PathVariable(value = "id") int id){
        Task[] task = tr.findAllByisCompletedAndUserId(true,id);
        return task;
    }

    @GetMapping("/user/{id}/isNotCompleted")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public Task[] getNotCompletedTask(@PathVariable(value = "id") int id){
        Task[] task = tr.findAllByisCompletedAndUserId(false,id);
        return task;
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void updateHabit(@PathVariable(value = "id") int id, @RequestBody Task task) throws ParseException {
        Task updateTask = tr.findByTaskId((id));
        updateTask.setTaskId(task.getTaskId());
        updateTask.setTitle(task.getTitle());
        updateTask.setCompleted(task.getCompleted());
        updateTask.setUserId(task.getUserId());
        updateTask.setEnd(task.getEnd());
        updateTask.setStart(task.getStart());

        System.out.println("Task Updated");
    }


}
