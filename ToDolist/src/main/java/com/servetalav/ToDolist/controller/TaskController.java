package com.servetalav.ToDolist.controller;

import com.servetalav.ToDolist.model.Task;
import com.servetalav.ToDolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    private Long nextID =1L;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task newTask){
        return taskRepository.save(newTask); // Eklenen görevi onay olarak geri döndürüyoruz
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updateTask){
        return taskRepository.findById(id).map(task -> {
            task.setBaslik(updateTask.getBaslik());
            task.setAciklama(updateTask.getAciklama());
            task.setTamamlandi_mi(updateTask.isTamamlandi_mi());
            return taskRepository.save(task);
        }).orElse(null);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);

    }
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null);// Veritabanında ID ile ara, bulamazsan null dön.
    }
}
