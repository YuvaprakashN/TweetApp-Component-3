package com.tweetapp.http;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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


