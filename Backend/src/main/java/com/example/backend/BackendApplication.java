package com.example.backend;

import com.example.backend.entity.Authority;
import com.example.backend.entity.User;
import com.example.backend.repository.AuthorityRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootApplication
@Transactional
public class BackendApplication implements CommandLineRunner {
	@Autowired
	private AuthorityRepository authorityRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<Authority> authorityList = authorityRepository.findAll();
		List<User> userList = userRepository.findAll();
		if(authorityList.isEmpty()){
			authorityList.add(new Authority("ROLE_ADMIN"));
			authorityList.add(new Authority("ROLE_USER"));
			authorityRepository.saveAll(authorityList);
		}
		if(userList.isEmpty()){
			userList.add(new User("admin", passwordEncoder.encode("123456"),
					authorityRepository.findByAuthority("ROLE_ADMIN").get()));
			userList.add(new User("test", passwordEncoder.encode("123456"),
					authorityRepository.findByAuthority("ROLE_USER").get()));
			userRepository.saveAll(userList);
		}

		//seed table1
	}
}
