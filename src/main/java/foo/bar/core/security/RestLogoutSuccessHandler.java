package foo.bar.core.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

/**
 * On a successful REST logout, send a redirect to /api/session. The response body won't contain anything
 * particularly useful, but the response headers will contain the latest session and security (CSRF) tokens, meaning
 * that subsequent POST requests can work.
 */
@Component
public class RestLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        response.sendRedirect("/api/session");
    }

}
