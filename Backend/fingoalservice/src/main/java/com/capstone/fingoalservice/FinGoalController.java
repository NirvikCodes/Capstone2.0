package com.capstone.fingoalservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/finGoal")
public class FinGoalController {

    @Autowired
    private FinGoalRepository fgr;

    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createFinGoal(@RequestBody FinGoal finGoal){
        this.fgr.save(finGoal);
        System.out.println("Goal Created");
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteGoal(@PathVariable(value = "id") int id){
        FinGoal finGoal = fgr.findByFinGoalId(id);
        this.fgr.delete(finGoal);
        System.out.println("Goal Deleted");
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.FOUND)
    public FinGoal getFinGoal(@PathVariable(value="id")int id){
        FinGoal finGoal = fgr.findByFinGoalId(id);
        return finGoal;
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(code = HttpStatus.FOUND)
    public FinGoal[] getFinGoalByUserId(@PathVariable(value = "id")int id) {
        FinGoal[] finGoals = fgr.findAllByUserId(id);
        return finGoals;
    }

    @GetMapping("/user/{id}/isCompleted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public FinGoal[] getCompletedFinGoal(@PathVariable(value = "id") int id){
        FinGoal[] finGoals = fgr.findByisCompletedAndUserId(true,id);
        return finGoals;
    }

    @GetMapping("/user/{id}/isNotCompleted")
    @ResponseStatus(code = HttpStatus.FOUND)
    public FinGoal[] getCompletedNotFinGoal(@PathVariable(value = "id") int id){
        FinGoal[] finGoals = fgr.findByisCompletedAndUserId(false,id);
        return finGoals;
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void updateFinGoal(@PathVariable(value = "id") int id,@RequestBody FinGoal finGoal){
        FinGoal updateFinGoal = fgr.findByFinGoalId(id);
        updateFinGoal.setGoalName(finGoal.getGoalName());
        updateFinGoal.setIsCompleted(finGoal.getIsCompleted());
        updateFinGoal.setTimeFrame(finGoal.getTimeFrame());
        updateFinGoal.setAmountToSave(finGoal.getAmountToSave());
        updateFinGoal.setAmountToSetAside(finGoal.getAmountToSetAside());
        updateFinGoal.setUserId(finGoal.getUserId());
        fgr.save(updateFinGoal);

    }




}
