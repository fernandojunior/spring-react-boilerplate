package foo.bar.repositories;

import foo.bar.entities.Comment;

public interface CommentRepository {

    Iterable<Comment> findAll();

    Comment save(Comment comment);

    void delete(Long id);

    Comment find(Long id);

}
