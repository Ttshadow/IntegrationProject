package com.example.backend;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.*;
import java.util.*;
import java.util.Date;

@SpringBootApplication
@Transactional
public class BackendApplication implements CommandLineRunner {
	@Autowired
	private AuthorityRepository authorityRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private PromotionRepository promotionRepository;
	@Autowired
	private CommentRepository commentRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<Authority> authorityList = authorityRepository.findAll();
		List<User> userList = userRepository.findAll();
		List<Promotion> promotionList = promotionRepository.findAll();
		List<Comment> commentList = commentRepository.findAll();
		if(authorityList.isEmpty()){
			authorityList.add(new Authority("ROLE_ADMIN"));
			authorityList.add(new Authority("ROLE_USER"));
			authorityRepository.saveAll(authorityList);
		}
		if(userList.isEmpty()){
			userList.add(new User("admin", passwordEncoder.encode("123456"),
					authorityRepository.findByAuthority("ROLE_ADMIN").get()));
			userList.add(new User("test",
				"uma@email.com", "742-902-1182", "Uma", "Charles", "",
				passwordEncoder.encode("123456"),
					authorityRepository.findByAuthority("ROLE_USER").get()));
			userList.add(new User("test1",
				"nana@email.com", "372-999-2391", "Nana", "Lee", "",
				passwordEncoder.encode("123456"),
				authorityRepository.findByAuthority("ROLE_USER").get()));
			userList.add(new User("test2",
				"peter@email.com", "438-234-1234", "Peter", "Pan", "",
				passwordEncoder.encode("123456"),
				authorityRepository.findByAuthority("ROLE_USER").get()));
			userRepository.saveAll(userList);
		}
		if(promotionList.isEmpty()){
			promotionList.add(new Promotion("20OFFTHURSDAY", "20% OFF",
					"Every Thursday Night",0.8,true));
			promotionList.add(new Promotion("15OFFWEDNESDAY", "15% OFF",
					"Every Wednesday Night",0.85,false));
			promotionList.add(new Promotion("10OFFTUESDAY", "10% OFF",
					"Every Tuesday Night",0.9,false));
			promotionRepository.saveAll(promotionList);
		}
		if(commentList.isEmpty()){
			commentList.add(new Comment("YUKI is just awesome! I just launched a startup that leaves me with no time for cooking, so YUKI is a life-saver. Now that I got used to it, I couldn't live without my daily meals!", new Date(122, Calendar.SEPTEMBER,21,13,8,21), userRepository.findByUsername("test2").get()));
			commentList.add(new Comment("Thank you for dinner last night. It was amazing!! I have to say it’s the best meal I have had in quite some time. You will definitely be seeing more of me eating at your establishment.", new Date(122, Calendar.SEPTEMBER,22,17,38,25), userRepository.findByUsername("test1").get()));
			commentList.add(new Comment("We were both absolutely pleased with everything at your place. Your wait staff was so pleasant and helpful. Your menu is very authentic. Do not change a thing!! The kitchen, the staff, the menu, and the sake list,  are all the finest. I will recommend it to everyone Yuki restaurant. Don’t change a thing! You are spot on!", new Date(122, Calendar.SEPTEMBER,25,21,8,10), userRepository.findByUsername("test").get()));
			commentRepository.saveAll(commentList);
		}

		//seed table1
	}
}