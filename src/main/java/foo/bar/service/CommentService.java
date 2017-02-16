package foo.bar.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import foo.bar.core.service.EntityService;
import foo.bar.entity.Comment;
import foo.bar.repository.CommentRepository;

@Service
public class CommentService implements EntityService<Comment> {

    @Inject
    private CommentRepository roleRepository;

    @Override
    public CommentRepository getRepository() {
        return roleRepository;
    }

}
