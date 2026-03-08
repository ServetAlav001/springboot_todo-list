package com.servetalav.ToDolist.service;

import com.servetalav.ToDolist.dto.TaskRequestDTO;
import com.servetalav.ToDolist.dto.TaskResponseDTO;
import com.servetalav.ToDolist.model.Task;
import com.servetalav.ToDolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(task -> new TaskResponseDTO(task.getId(), task.getBaslik(), task.getAciklama(), task.isTamamlandi_mi()))
                .collect(Collectors.toList());
    }

    public Optional<TaskResponseDTO> getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(task -> new TaskResponseDTO(task.getId(), task.getBaslik(), task.getAciklama(), task.isTamamlandi_mi()));
    }

    public TaskResponseDTO createTask(TaskRequestDTO dto) {
        Task task = new Task();
        task.setBaslik(dto.getBaslik());
        task.setAciklama(dto.getAciklama());
        task.setTamamlandi_mi(dto.isTamamlandi_mi());
        Task saved = taskRepository.save(task);
        return new TaskResponseDTO(saved.getId(), saved.getBaslik(), saved.getAciklama(), saved.isTamamlandi_mi());
    }

    public Optional<TaskResponseDTO> updateTask(Long id, TaskRequestDTO dto) {
        return taskRepository.findById(id).map(task -> {
            task.setBaslik(dto.getBaslik());
            task.setAciklama(dto.getAciklama());
            task.setTamamlandi_mi(dto.isTamamlandi_mi());
            Task saved = taskRepository.save(task);
            return new TaskResponseDTO(saved.getId(), saved.getBaslik(), saved.getAciklama(), saved.isTamamlandi_mi());
        });
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}