package com.prathmesh.todo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prathmesh.todo.Repository.todoListRepository;
import com.prathmesh.todo.entity.todoList;

@Service
public class todoService {


    @Autowired
    private todoListRepository todoListRepository;

    public List<todoList> getAllTodos() {
        return todoListRepository.findAll();
    }

    public todoList addTodo(todoList todo) {
        return todoListRepository.save(todo);
    }

    public void markAsDone(String title) {
        Optional<todoList> todoOptional = todoListRepository.findByTitle(title);
        todoOptional.ifPresent(todo -> {
            todo.setCompleted(true);
            todoListRepository.save(todo);
        });
    }

    public void deleteTodoByTitle(String title) {
        Optional<todoList> todoOptional = todoListRepository.findByTitle(title);
        todoOptional.ifPresent(todoListRepository::delete);
    }
}


