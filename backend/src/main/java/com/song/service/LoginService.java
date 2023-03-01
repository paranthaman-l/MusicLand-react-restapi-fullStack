package com.song.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.song.model.User;
import com.song.repository.UserRepository;
import com.song.serviceInt.LoginServiceInt;

@Service
public class LoginService implements LoginServiceInt{
	
	@Autowired
	private UserRepository userRepository;
	@Override
	public User Login(String uid) {
		return  userRepository.findById(uid).get();
	}
	@Override
	public Boolean isExistUser(String uid) {
		Optional<User> user = userRepository.findById(uid);
		if(user.isEmpty())
			return false;
		return true;
	}
}
