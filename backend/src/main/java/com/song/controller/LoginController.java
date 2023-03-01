package com.song.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.song.model.User;
import com.song.service.LoginService;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	@GetMapping("/")
	public String index() {
		return "Welcome to my REST API for Login";
	}
	
	@GetMapping("/{uid}")
	public User login(@PathVariable String uid) {
		 return loginService.Login(uid);
	}
	
	@GetMapping("/isexistuser/{uid}")
	public boolean isExistUser(@PathVariable String uid) {
		return loginService.isExistUser(uid);
	}
}

