package foo.bar.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import foo.bar.entity.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
}
