package com.tweetapp.http;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@ToString
public class TweetPostRequest {

	@NonNull
	private String tweetText;
	

	
}
