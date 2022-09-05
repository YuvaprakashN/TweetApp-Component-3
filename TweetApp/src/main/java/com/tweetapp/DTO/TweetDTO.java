package com.tweetapp.DTO;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class TweetDTO {

	private long tweetId;

	private String tweetText;

	private Date tweetDate;
	
	private UserDTO user;

	private int tweetLike;


	
}
