package com.tweetapp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.entity.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long>{

	public Optional<User> findByEmailAndPassword(String email,String password);

	public Optional<User> findByEmail(String email);
	
	public List<User> findByUsernameContains(String userName);

}
