package com.capstone.habitservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepository extends JpaRepository<Habit,Integer> {

    Habit findByHabitId(Integer habitId);

    Habit[] findAllByUserid(int userId);

    Habit[] findAllByIscompletedAndUserid(boolean iscompleted, int habitId);

}
