package com.backend.security;


import com.backend.db.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {



    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDatailsService;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/rest-services/topiclist").permitAll()
                //.antMatchers("/rest-services/**").authenticated()
                .antMatchers("/**").permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .and()
                .headers().frameOptions().disable()

                .and()
                .formLogin()
                .loginPage("/webui/login")
                .loginProcessingUrl("/rest-services/login")
                .passwordParameter("password")
                .usernameParameter("username")
                .successHandler(successHandler())
                .failureHandler(failureHandler())

                .and()
                .logout()
                .logoutUrl("/rest-services/logout")
                .logoutSuccessHandler(logoutSuccesHandler())
                //.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET")) // https://docs.spring.io/spring-security/site/docs/4.2.12.RELEASE/apidocs/org/springframework/security/config/annotation/web/configurers/LogoutConfigurer.html
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
                //.logoutSuccessUrl("/login");
    }

    private LogoutSuccessHandler logoutSuccesHandler() {
        return new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                httpServletResponse.setStatus(200);
            }
        };
    }

    private AuthenticationFailureHandler failureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                httpServletResponse.setStatus(401);
            }
        };
    }

    @Bean
    protected AuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDatailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    private AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                //httpServletResponse.getWriter().append("OK");
                httpServletResponse.setStatus(200);
                Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                String type = "GUEST";
                if (principal instanceof UserPrincipal) {
                    type = ((UserPrincipal) principal).getUserType();
                    type = type.toUpperCase();
                }
                httpServletResponse.getWriter().append(type);
            }
        };
    }


    public static void main(String[] args) {
        System.out.println(TimeUnit.DAYS.toSeconds(1));
    }
}
