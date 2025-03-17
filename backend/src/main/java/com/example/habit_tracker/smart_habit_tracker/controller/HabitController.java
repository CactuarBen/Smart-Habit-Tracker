package com.example.habit_tracker.smart_habit_tracker.controller;

import com.example.habit_tracker.smart_habit_tracker.model.Habit;
import com.example.habit_tracker.smart_habit_tracker.repository.HabitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {

    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    @GetMapping
    public ResponseEntity<List<Habit>> getAllHabits() {
        List<Habit> habits = habitRepository.findAll();
        habits.forEach(habit -> System.out.println("Habit: " + habit.getId() + ", " + habit.getName() + ", " + habit.getFrequency()));
        return ResponseEntity.ok(habits);
    }

    @PostMapping
    public ResponseEntity<Habit> addHabit(@RequestBody Habit habit) {
        System.out.println("Received habit: " + habit);

        if (habit.getName() == null || habit.getFrequency() == null) {
            System.out.println("ERROR: Received empty habit!");
        }

        Habit savedHabit = habitRepository.save(habit);
        System.out.println("Saved habit: " + savedHabit);

        return ResponseEntity.ok(savedHabit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabit(@PathVariable Long id) {
        if (!habitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        habitRepository.deleteById(id);
        return ResponseEntity.ok("Habit deleted successfully");
    }

}
