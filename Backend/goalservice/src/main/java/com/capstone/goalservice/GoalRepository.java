package com.capstone.goalservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal,Integer> {

    Goal findByGoalId(int goalId);

    Goal[] findAllByUserId(int userId);

    Goal[] findAllByisCompletedAndUserId(boolean completed, int userid);


}
