package com.tweetapp.http;

import java.time.LocalDate;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;



	@Data
	@RequiredArgsConstructor
	@NoArgsConstructor
	public class UserRegisterationRequest {
	  
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
	    @NonNull
	    private String password;
	
	  
	    private LocalDate dob; 
	  
	    @CreationTimestamp
	    public Date createdDate;

	}


