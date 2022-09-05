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

//@EnableSwagger2
@SpringBootApplication
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

		}
//
	}

//	public static final Contact DEFAULT_CONTACT = new Contact(
//			"Yuvaprakash",null ,"yuvaprakash.n@cognizant.com");
//	
//	public static final ApiInfo DEFAULT_API_INFO = new ApiInfo(
//			"Authorization Microservice", 
//			"The intent of this Microservice is to provide authorization. Sign up of user and get token method is handled by this microservcie.",
//			"1.0",
//			"can be accessed only from an registered Client aplpication", DEFAULT_CONTACT, 
//			"Return order Management System", "http://localhost/returnordermanagement", Arrays.asList());
//	
//
//	private static final Set<String> DEFAULT_PRODUCES_AND_CONSUMES = 
//			new HashSet<>(Arrays.asList("application/json"));
//
//	@Bean
//	public Docket api() {
//		return new Docket(DocumentationType.SWAGGER_2)
//				.apiInfo(DEFAULT_API_INFO)
//				.produces(DEFAULT_PRODUCES_AND_CONSUMES)
//				.consumes(DEFAULT_PRODUCES_AND_CONSUMES);
//	}	
//	
}
