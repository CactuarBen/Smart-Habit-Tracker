package com.example.habit_tracker.smart_habit_tracker.repository;

import com.example.habit_tracker.smart_habit_tracker.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findAllByOrderByIdAsc();
}
