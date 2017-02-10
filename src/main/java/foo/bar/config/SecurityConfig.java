package foo.bar.config;

import javax.inject.Inject;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import foo.bar.core.security.RestAuthenticationFailureHandler;
import foo.bar.core.security.RestAuthenticationSuccessHandler;
import foo.bar.core.security.RestLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private RestAuthenticationSuccessHandler authenticationSuccessHandler;

    @Inject
    private RestAuthenticationFailureHandler authenticationFailureHandler;

    @Inject
    private RestLogoutSuccessHandler logoutSuccessHandler;

    /**
     * Demo-only users. Replace this with a real authentication config.
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("user").password("password").roles("USER").and().withUser("admin")
                .password("admin").roles("USER", "ADMIN");
    }

    /**
     * Specify the paths that Spring Security will completely ignore. This is distinct from paths that are available to
     * all users. Static, public resources are ideal candidates.
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/index.html", "/app/**", "/bower_components/**", "/favicon.ico");
    }

    public void configurePermissions(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/", "/api/session", "/api/comments").permitAll().anyRequest()
                .authenticated();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // permissions
        configurePermissions(http);

        // login handling
        http.formLogin().loginPage("/signin").loginProcessingUrl("/api/signin")
                .successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler).permitAll();

        // logout handling
        http.logout().logoutUrl("/api/signout").logoutSuccessHandler(logoutSuccessHandler).permitAll();

        // CSRF tokens handling
        http.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class).csrf().csrfTokenRepository(csrfTokenRepository());
    }

    /**
     * Change the standard CSRF token header name to match what the front-end code expects. See also
     * {@link CsrfHeaderFilter}.
     */
    private static CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

}
