package com.pugnascotia.reactdemo.comments;

public interface CommentRepository {

    Iterable<Comment> findAll();

    Comment save(Comment comment);

    void delete(Long id);

    Comment find(Long id);

}
