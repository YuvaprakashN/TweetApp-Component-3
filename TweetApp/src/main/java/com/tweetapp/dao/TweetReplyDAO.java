package com.tweetapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tweetapp.entity.TweetReply;

public interface TweetReplyDAO extends JpaRepository<TweetReply, Long> {

}
