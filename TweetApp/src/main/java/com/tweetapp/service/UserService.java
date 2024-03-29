package com.tweetapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.DTO.UserDTO;
import com.tweetapp.customException.InvalidCredentialsException;
import com.tweetapp.customException.UserException;
import com.tweetapp.dao.UserDAO;
import com.tweetapp.entity.User;
import com.tweetapp.http.ForgotPasswordRequest;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserDAO userDao;

	public UserDTO saveUser(User user) throws UserException {
log.info("Saving user:"+user);
		Optional<User> isUserPresent = userDao.findByEmail(user.getEmail());
		if(isUserPresent.isPresent())
			throw new UserException("User with Email: "+user.getEmail()+" is already exist");
		user.setUsername(user.getFirstName()+" "+user.getLastName());
		User saveduser = userDao.save(user);
		return convertUsertoUserDto(saveduser);

	}

	public UserDTO findByEmailAndPassword(String email, String password) throws InvalidCredentialsException {

		Optional<User> dbUser = userDao.findByEmailAndPassword(email, password);
		UserDTO dto = null;
		if (dbUser.isPresent()) {

			User user = dbUser.get();
			dto = convertUsertoUserDto(user);
			return dto;
		}else
		{
			throw new InvalidCredentialsException("Invalid Credentials");
		}


	}
	
	
	public UserDTO convertUsertoUserDto(User user) {
		return new UserDTO(user.getId(),user.getUsername(),user.getFirstName(),user.getLastName(),user.getPhoneNumber(),user.getEmail());
	}

	public List<User> findByUserByUserName(String userName) {
		
		return userDao.findByUsernameContains(userName);
	}
	public User findByUserId(long userId) throws UserException {
		
		 
		Optional<User> optional = userDao.findById( userId);
		//Check user is present or not
		if(optional.isPresent()) {//Check whether user is available or not
		return optional.get();}
		
		throw new UserException("User Not Found");
	}
	
	public List<User> getAllUser(){
		return userDao.findAll();
	}
	
	public User forgotPassword(ForgotPasswordRequest request,String userEmail) throws UserException {
		if(request.getConfirmPassword().equals(request.getNewPassword()))
		{
		Optional<User> userOptional = userDao.findByEmail(userEmail);
		User user=null;
		if(userOptional.isPresent()) {
			user=userOptional.get();
			user.setPassword(request.getConfirmPassword());
			userDao.save(user);
		}else {
			throw new UserException("User Not Found");
		}
		
		return user;
		}
		throw new UserException("Password and Confirm password should be same");
	}
	
	

}
