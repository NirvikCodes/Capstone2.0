package com.capstone.taskservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {

    Task findByTaskId(int taskId);

    Task[] findAllByUserId(int userId);

    Task[] findAllByisCompletedAndUserId(boolean completed, int userId);
}
