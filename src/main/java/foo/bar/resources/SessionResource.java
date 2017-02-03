package foo.bar.resources;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import foo.bar.config.authentication.AjaxLogoutSuccessHandler;
import foo.bar.utils.State;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Returns the user's current authentication status.
 *
 * @see AjaxLogoutSuccessHandler for how this is used.
 */
@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class SessionResource {

    @RequestMapping("/session")
    public Map<String, Object> getSessionStatus(HttpServletRequest request) {
        return State.getAuthState(request);
    }

}
