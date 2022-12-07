package com.capstone.fingoalservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinGoalRepository extends JpaRepository<FinGoal,Integer> {

    FinGoal findByFinGoalId(int finGoalId);

    FinGoal[] findAllByUserId(int userId);

    FinGoal[] findByisCompletedAndUserId(boolean isCompleted, int userId);


}
