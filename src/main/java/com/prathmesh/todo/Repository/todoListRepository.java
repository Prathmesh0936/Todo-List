package com.prathmesh.todo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prathmesh.todo.entity.todoList;

public interface todoListRepository extends JpaRepository<todoList, Integer> {

    Optional<todoList> findByTitle(String title);

}
