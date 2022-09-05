package com.tweetapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.entity.Tweet;
import com.tweetapp.entity.User;

@Repository
public interface TweetDAO extends  JpaRepository<Tweet, Long>{

	
	public Tweet findByTweetIdAndUser(long id,User user);
	
	public List<Tweet> findByUser(User user);
}
