package com.tweetapp.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.DTO.UserDTO;
import com.tweetapp.customException.InvalidCredentialsException;
import com.tweetapp.customException.UserException;
import com.tweetapp.entity.User;
import com.tweetapp.http.ForgotPasswordRequest;
import com.tweetapp.http.LoginRequest;
import com.tweetapp.http.UserRegisterationRequest;
import com.tweetapp.service.UserService;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(originPatterns = "*")
@Slf4j
public class UserController {
 
	@Autowired
	private UserService userService;

	
	@PostMapping("/register")
	@ApiOperation(value = "AddUser", notes = "Register the user", httpMethod = "POST")
	public ResponseEntity<UserDTO> subscribeClient(@RequestBody UserRegisterationRequest request) throws  UserException, IllegalAccessException, InvocationTargetException {

		log.info("Register User: "+request);
		User user=new User();
		BeanUtils.copyProperties(user, request);
			UserDTO savedUser = userService.saveUser(user);
			return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}


	@PostMapping("/login")
	@ApiOperation(value = "LoginUser", notes = "Login to the Tweet application", httpMethod = "POST")
	public ResponseEntity<UserDTO> authenticateClient(@RequestBody LoginRequest request) throws InvalidCredentialsException {
		log.info("User Login Request: "+request.toString());
		String username = request.getEmail();
		String password = request.getPassword();
		
		
		return new ResponseEntity<>(userService.findByEmailAndPassword(username,password), HttpStatus.OK);
	}
	
	@GetMapping("/users/all")
	@ApiOperation(value = "All USer", notes = "Show all user", httpMethod = "GET")
	public List<User> getAllTweet(){
		
	return	userService.getAllUser();
		
	}
	
	
	@PostMapping("/{userEmail}/forgot")
	@ApiOperation(value = "ForgotPassword", notes = "Forgot password", httpMethod = "POST")
	public User forgotPassword(@RequestBody ForgotPasswordRequest request,@PathVariable String userEmail) throws UserException {
		log.info("Forgot: "+request.toString());
		return userService.forgotPassword(request, userEmail);
	}
	
	@GetMapping("/user/search/{userName}")
	@ApiOperation(value = "Search User", notes = "Search user", httpMethod = "GET")
	public List<User> getAllUserByUserName(@PathVariable String userName) {
		return userService.findByUserByUserName(userName);
		
	}
}