package com.servetalav.ToDolist.repository;

import com.servetalav.ToDolist.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
