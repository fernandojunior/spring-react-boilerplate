package foo.bar.core.utils;

import static foo.bar.core.utils.Streams.asStream;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Utility methods for making it easier to map over a Java list.
 */
public final class Functions {

    private Functions() {
    }

    public static <T, V> List<V> map(final List<T> in, final Function<T, V> function) {
        return in == null ? null : map(in.stream(), function);
    }

    public static <T, V> List<V> map(final Stream<T> in, final Function<T, V> function) {
        return in == null ? null : in.map(function).collect(Collectors.toList());
    }

    public static <T, V> List<V> map(final Iterable<T> in, final Function<T, V> function) {
        return map(asStream(in), function);
    }
}
