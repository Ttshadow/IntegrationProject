package com.example.backend.entity;

import com.example.backend.constant.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.persistence.Table;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Setter
@Getter
@ToString
@NoArgsConstructor
public class User extends IdBaseEntity implements UserDetails {
    private String username;
    private String email;
    private String tel;
    @Size(max = 30, message = ErrorMessage.FIRSTNAME_SIZE_LIMIT_ERROR_MESSAGE)
    private String firstName;
    @Size(max = 30, message = ErrorMessage.LASTNAME_SIZE_LIMIT_ERROR_MESSAGE)
    private String lastName;
    private String image;
    private String password;
    @JoinColumn(name = "authority_id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private Authority authority;

    public User(String username, String password, Authority authority) {
        this.username = username;
        this.password = password;
        this.authority = authority;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new Authority("ROLE_ADMIN"));
        roles.add(new Authority("ROLE_USER"));
        return roles;
    }

    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}