package com.pugnascotia.reactdemo.comments;

/**
 * Simple data container class. We need a no-args constructor so that Jackson can deserialise these.
 */
public class Comment {
    private Long id;
    private String author;
    private String content;

    public Comment() {
    }

    public Comment(String author, String content) {
        setAuthor(author);
        setContent(content);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

}
