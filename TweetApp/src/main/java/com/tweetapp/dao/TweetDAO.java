package com.tweetapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.entity.Tweet;
import com.tweetapp.entity.User;

@Repository
public interface TweetDAO extends  JpaRepository<Tweet, Long>{

	//@Query(value = "SELECT * FROM Tweet as t LEFT JOIN User as u on u.id=t.tweet_Id where t.tweet_Id=?1 and u.id=?2",nativeQuery = true)
	//public Tweet getTweetByIdAndUserId(long tweetId,long userId);
	
	public Tweet findByTweetIdAndUser(long id,User user);
	
	public List<Tweet> findByUser(User user);
}
