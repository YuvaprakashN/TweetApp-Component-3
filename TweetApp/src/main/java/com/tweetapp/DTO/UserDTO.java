package com.tweetapp.DTO;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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


