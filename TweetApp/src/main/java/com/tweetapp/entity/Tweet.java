package com.tweetapp.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
@Entity
public class Tweet {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long tweetId;

	@NonNull
    @Column(nullable = false)
	private String tweetText;

	@NonNull
    @Column(nullable = false)
	@CreationTimestamp
	private Date tweetDate;
	
	@ManyToOne
	private User user;

	private int tweetLike;
	
	@OneToMany(mappedBy = "tweet",cascade = CascadeType.ALL,orphanRemoval = true)
    public List<TweetReply> tweetReplies=new ArrayList<>();
    


	
}
