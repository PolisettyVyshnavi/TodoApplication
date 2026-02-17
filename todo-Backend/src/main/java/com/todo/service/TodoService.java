package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> getAllTodos() {
        return repo.findAll();
    }

    public Todo addTodo(Todo todo) {
        return repo.save(todo);
    }

    public void deleteTodo(Long id) {
        repo.deleteById(id);
    }

    public Todo updateTodo(Long id, Todo newTodo) {
        Todo todo = repo.findById(id).orElseThrow();
        todo.setTitle(newTodo.getTitle());
        todo.setCompleted(newTodo.isCompleted());
        return repo.save(todo);
    }
}
