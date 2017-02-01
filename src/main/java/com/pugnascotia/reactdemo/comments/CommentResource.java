package com.pugnascotia.reactdemo.comments;

import java.util.List;
import javax.inject.Inject;

import com.pugnascotia.reactdemo.utils.Functions;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

/**
 * Handles creating new comments and fetching all comments via AJAX.
 */

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class CommentResource {

    private final CommentRepository repository;

    @Inject
    public CommentResource(CommentRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(path = "/comments", method = POST)
    public Comment add(@RequestBody Comment comment) {
        // log.info("{}", comment);
        return repository.save(comment);
    }

    @RequestMapping(path = "/comments/{id}", method = DELETE)
    public void delete(@PathVariable Long id) {
        repository.delete(id);
    }

    @RequestMapping(path = "/comments", method = GET)
    public List<Comment> comments() {
        // You shouldn't do this in a real app - you should page the data!
        return Functions.map(repository.findAll(), c -> c);
    }

}
