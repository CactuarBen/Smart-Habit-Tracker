package com.example.habit_tracker.smart_habit_tracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "habits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Habit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String frequency;

    public String getName() {
        return name;
    }

    public String getFrequency() {
        return frequency;
    }

    public Long getId() {
        return id;
    }
}
