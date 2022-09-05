package com.tweetapp.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.customException.TweetException;
import com.tweetapp.customException.UserException;
import com.tweetapp.dao.TweetDAO;
import com.tweetapp.dao.TweetReplyDAO;
import com.tweetapp.entity.Tweet;
import com.tweetapp.entity.TweetReply;
import com.tweetapp.entity.User;
import com.tweetapp.http.TweetPostRequest;
import com.tweetapp.http.TweetReplyRequest;

@Service
public class TweetService {

	@Autowired
	TweetDAO tweetDao;
	
	@Autowired
	TweetReplyDAO tweetReplyDAO;

	@Autowired
	UserService userService;

	public TweetService() {
		// TODO Auto-generated constructor stub
	}

	public Tweet findTweetById(long tweetId) {

		return tweetDao.findById(tweetId).get();
	}

	public Tweet saveTweet(TweetPostRequest tweetRequest, long userId)
			throws IllegalAccessException, InvocationTargetException, UserException {
		Tweet tweet = new Tweet();
		tweet.setTweetText(tweetRequest.getTweetText());
		User user = userService.findByUserId(userId);
		tweet.setUser(user);
		return tweetDao.save(tweet);
	}

	public Tweet updateTweet(TweetPostRequest tweetRequest, long userId, long tweetId) throws TweetException {

		if (checkTweetIsValidUser(tweetId, userId)) {
			Tweet tweet = tweetDao.findById(tweetId).get();
			tweet.setTweetText(tweetRequest.getTweetText());
			return tweetDao.save(tweet);
		}

		return null;
	}

	public void deleteTweet(long tweetId, long userId)
			throws IllegalAccessException, InvocationTargetException, TweetException {

		if (checkTweetIsValidUser(tweetId, userId))
			tweetDao.deleteById(tweetId);

	}
	
	public void likeTweet(long tweetId,long userId) throws TweetException {
		
		Tweet tweet = tweetDao.findById(tweetId).get();
		tweet.setTweetLike( tweet.getTweetLike()+1);
		tweetDao.save(tweet);
	}

	
	public List<Tweet> getAllTweet(){
		return tweetDao.findAll();
	}
	
	public List<Tweet> getAllTweetByUser(long userId) throws UserException{
		User user = userService.findByUserId(userId);
		
		return tweetDao.findByUser(user);
	}
	
	public void replyTweet(TweetReplyRequest request,long tweetId,long userId) throws TweetException, UserException {
		Tweet tweet = tweetDao.findById(tweetId).get();
		User user=userService.findByUserId(userId);
		TweetReply tweetReply=new TweetReply();
		tweetReply.setReplyMessage(request.getReplyMessage());
		tweetReply.setUser(user);
		tweetReply.setTweet(tweet);
		tweetReplyDAO.save(tweetReply);
	}
	
	private boolean checkTweetIsValidUser(long tweetId, long userId) throws TweetException {

		Optional<Tweet> tweetOptional = tweetDao.findById(tweetId);
		if (tweetOptional.isPresent()) {
			if (tweetOptional.get().getUser().getId() == userId) {
				return true;
			} else {
				throw new TweetException("User does not have permission to delete the tweet");
			}
		} else
			throw new TweetException("Tweet Not Found");

	}
	
	

}
