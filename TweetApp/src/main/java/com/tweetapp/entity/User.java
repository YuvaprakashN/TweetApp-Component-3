package com.tweetapp.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Entity

@Table(name="userEntity")
@NoArgsConstructor
@JsonIgnoreProperties({ "phoneNumber", "email", "password", "tweets" })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NonNull
	@Column(nullable = false)
	private String username ;
	@NonNull
	@Column(nullable = false)
	private String firstName;
	@NonNull
	@Column(nullable = false)
	private String lastName;
	@NonNull
	@Column(nullable = false)
	private String phoneNumber;
	@NonNull
	@Column(nullable = false, unique = true)
	private String email;
	@NonNull
	@Column(nullable = false)
	private String password;

	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Tweet> tweets;

	@NonNull
	private LocalDate dob;

	@CreationTimestamp
	public Date createdDate;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	public List<TweetReply> tweetReplies = new ArrayList<>();

}
