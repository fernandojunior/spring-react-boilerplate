package foo.bar.core.service;

import java.io.Serializable;

import org.springframework.data.repository.Repository;

import foo.bar.core.entity.Identifiable;

@FunctionalInterface
public interface EntityService<T extends Identifiable<? extends Serializable>> {

    public Repository<T, ? extends Serializable> getRepository();

}
