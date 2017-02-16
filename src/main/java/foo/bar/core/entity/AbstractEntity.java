package foo.bar.core.entity;

import javax.persistence.*;

import java.io.Serializable;

@MappedSuperclass
public abstract class AbstractEntity<I extends Serializable> implements Identifiable<I> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "INT(11)")
    private I id;

    @Override
    public I getId() {
        return this.id;
    }

    public void setId(I id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AbstractEntity<?> that = (AbstractEntity<?>) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

}
