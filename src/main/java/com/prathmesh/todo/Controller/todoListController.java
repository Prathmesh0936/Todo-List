package com.prathmesh.todo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prathmesh.todo.Service.todoService;
import com.prathmesh.todo.entity.todoList;


@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5500") // Allow frontend requests
public class todoListController {


    @Autowired
    private todoService todoService;

    @GetMapping
    public List<todoList> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping("/add")
    public todoList addTodo(@RequestBody todoList todo) {
        return todoService.addTodo(todo);
    }

    @PutMapping("/done/{title}")
    public ResponseEntity<Void> markAsDone(@PathVariable String title) {
        todoService.markAsDone(title);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/title/{title}")
    public ResponseEntity<Void> deleteTodoByTitle(@PathVariable String title) {
        todoService.deleteTodoByTitle(title);
        return ResponseEntity.ok().build();
    }
}

