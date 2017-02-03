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

import foo.bar.config.authentication.AjaxAuthenticationFailureHandler;
import foo.bar.config.authentication.AjaxAuthenticationSuccessHandler;
import foo.bar.config.authentication.AjaxLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Inject
    private AjaxAuthenticationSuccessHandler authSuccessHandler;

    @Inject
    private AjaxAuthenticationFailureHandler authFailureHandler;

    @Inject
    private AjaxLogoutSuccessHandler logoutSuccessHandler;

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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/", "/api/session", "/api/comments").permitAll().anyRequest()
                .authenticated().and().formLogin().loginPage("/signin").loginProcessingUrl("/api/signin")
                .successHandler(authSuccessHandler).failureHandler(authFailureHandler).permitAll().and()
                .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class).csrf()
                .csrfTokenRepository(csrfTokenRepository()).and().logout().logoutUrl("/api/signout")
                .logoutSuccessHandler(logoutSuccessHandler).permitAll();
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
