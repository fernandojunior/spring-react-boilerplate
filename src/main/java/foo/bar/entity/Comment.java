package foo.bar.entity;

import javax.persistence.Entity;

import foo.bar.core.entity.AbstractEntity;

/**
 * Simple data container class.
 */
@Entity
public class Comment extends AbstractEntity<Long> {

    private String author;
    private String content;

    public Comment() {
        super();
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Comment [id=" + this.getId() + ", author=" + author + ", content=" + content + "]";
    }

}
