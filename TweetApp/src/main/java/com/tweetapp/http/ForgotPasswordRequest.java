package com.tweetapp.http;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class ForgotPasswordRequest {


	   @NonNull
	    private String email;

	    @NonNull
	    private String confirmPassword;
	    @NonNull
	    private String newPassword;
		
		

}
