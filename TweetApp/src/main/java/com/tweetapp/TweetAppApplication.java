package com.tweetapp;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import com.tweetapp.dao.TweetDAO;
import com.tweetapp.dao.UserDAO;
import com.tweetapp.entity.Tweet;
import com.tweetapp.entity.User;
import com.tweetapp.http.TweetReplyRequest;
import com.tweetapp.service.TweetService;
import com.tweetapp.service.UserService;

import lombok.extern.slf4j.Slf4j;

//@EnableSwagger2
@SpringBootApplication
@Slf4j
public class TweetAppApplication implements CommandLineRunner {

	@Autowired
	UserService userService;
	@Autowired
	TweetDAO tweetDAO;
	@Autowired
	UserDAO userDAO;
	@Autowired
	TweetService tweetService;

	public static void main(String[] args) {
		SpringApplication.run(TweetAppApplication.class, args);
	}

	@Transactional
	@Override
	public void run(String... args) throws Exception {
		
		try {
			User user = new User("test", "test", "test", "9876543211", "test@gmail.com", "password",LocalDate.now());
			userService.saveUser(user);
			Tweet tweet = new Tweet();
			tweet.setTweetText("First Tweet");
			tweet.setUser(user);
			tweetDAO.save(tweet);
			TweetReplyRequest replyRequest=new  TweetReplyRequest("First Reply");
			tweetService.replyTweet(replyRequest, tweet.getTweetId(),user.getId() );
		} catch (Exception e) {
log.error(e.getMessage());
		}
	}

}
