package foo.bar.resource;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foo.bar.core.controller.EntityController;
import foo.bar.entity.Comment;
import foo.bar.repository.CommentRepository;
import foo.bar.service.CommentService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

/**
 * Handles creating new comments and fetching all comments via AJAX.
 */
@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class CommentResource implements EntityController<Comment> {

    @Inject
    private CommentService service;

    @Override
    public CommentService getService() {
        return this.service;
    }

    public CommentRepository getRepository() {
        return this.service.getRepository();
    }

    @RequestMapping(path = "/comments", method = POST)
    public Comment add(@RequestBody Comment comment) {
        return this.getRepository().save(comment);
    }

    @RequestMapping(path = "/comments/{id}", method = DELETE)
    public void delete(@PathVariable Long id) {
        this.getRepository().delete(id);
    }

    @RequestMapping(path = "/comments", method = GET)
    public Iterable<Comment> comments() {
        return this.getRepository().findAll();
    }

}
