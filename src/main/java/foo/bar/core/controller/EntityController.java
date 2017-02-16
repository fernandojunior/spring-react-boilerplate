package foo.bar.core.controller;

import foo.bar.core.service.EntityService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.Controller;

import foo.bar.core.entity.Identifiable;

/**
 * Entity controller interface to use with {@link RestController} or {@link Controller}
 */
@FunctionalInterface
public interface EntityController<T extends Identifiable<?>> {

    EntityService<T> getService();

}
