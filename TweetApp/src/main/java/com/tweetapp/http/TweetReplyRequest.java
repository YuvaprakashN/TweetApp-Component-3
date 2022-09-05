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
public class TweetReplyRequest {

	@NonNull
	private String replyMessage;
	

	
}
