package com.tweetapp.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.customException.TweetException;
import com.tweetapp.customException.UserException;
import com.tweetapp.entity.Tweet;
import com.tweetapp.http.TweetPostRequest;
import com.tweetapp.http.TweetReplyRequest;
import com.tweetapp.service.TweetService;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(originPatterns = "*")
@Slf4j
public class TweetController {
	
	@Autowired
	TweetService service;

	public TweetController() {
		//Default Constructor
	}

	@PostMapping("/{userId}/add")
	@ApiOperation(value = "Post Tweet", notes = "Post the user tweet", httpMethod = "POST", response = Tweet.class)
	
	public Tweet saveTweet(@RequestBody TweetPostRequest tweetPostRequest,@PathVariable long userId) throws IllegalAccessException, InvocationTargetException, UserException{
		log.info("TweetPosted: "+tweetPostRequest+" User: "+userId);
		
		return service.saveTweet(tweetPostRequest, userId);
	}
	
	@PutMapping("/{userId}/update/{tweetId}")
	@ApiOperation(value = "update Tweet", notes = "Update the existing tweet", httpMethod = "POST", response = Tweet.class)
	public Tweet updateTweet(@RequestBody TweetPostRequest tweetRequest,@PathVariable long userId,@PathVariable long tweetId) throws TweetException {
		
		log.info("TweetId: "+tweetId+" userId: "+userId+" text: "+tweetRequest.getTweetText());
		return service.updateTweet(tweetRequest, userId, tweetId);
	}
	
	@DeleteMapping("/{userId}/delete/{tweetId}")
	@ApiOperation(value = "Delete Tweet", notes = "Delete the user tweet", httpMethod = "DELETE")
	public void deleteTweet(@PathVariable long userId,@PathVariable long tweetId) throws TweetException{
	
		service.deleteTweet(tweetId, userId);
		
	}
	
	@GetMapping("/health")
	public String health() {
		return "UP";
	}
	
	
	@PutMapping("/{userId}/like/{tweetId}")
	@ApiOperation(value = "TweetLike", notes = "Like the tweet", httpMethod = "PUT")
	public void likeTweet(@PathVariable long userId,@PathVariable long tweetId) throws TweetException  {
	
		service.likeTweet(tweetId, userId);

	}
	
	@PostMapping("/{userId}/reply/{tweetId}")
	@ApiOperation(value = "Tweet Reply", notes = "Reply to the Tweet", httpMethod = "POST")
	public void replyTweet(@RequestBody TweetReplyRequest replyRequest,@PathVariable long userId,@PathVariable long tweetId) throws  TweetException, UserException {
		
		log.info("TweetId: "+tweetId+" userId: "+userId+" text: "+replyRequest.getReplyMessage());
		 service.replyTweet(replyRequest, tweetId,userId);
	}
	
	@GetMapping("/all")
	@ApiOperation(value = "Tweets", notes = "Get all tweet", httpMethod = "GET")
	public List<Tweet> getAllTweet(){
		
	return	service.getAllTweet();
		
	}
	
	@GetMapping("/{userId}")
	@ApiOperation(value = "UserTweet", notes = "Get all tweets of given user", httpMethod = "GET")
	public List<Tweet> getAllTweetByUser(@PathVariable long userId) throws UserException{
		
	return	service.getAllTweetByUser(userId);
		
	}
	
}
