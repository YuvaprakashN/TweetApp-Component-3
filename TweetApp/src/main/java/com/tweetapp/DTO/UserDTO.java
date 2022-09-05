package com.tweetapp.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;



	@Data
	@RequiredArgsConstructor
	
	@NoArgsConstructor
	public class UserDTO {

		 @NonNull
	    private long id;
	    @NonNull
	    private String username;
	    @NonNull
	    private String firstName;
	    @NonNull
		private String lastName;
	    @NonNull
		private String phoneNumber;
	    @NonNull
	    private String email;
	}


