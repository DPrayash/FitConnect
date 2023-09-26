package com.stackroute.productwebappservice.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Controller {
    public String webapp() {
        return "index.html";
    }
    
    @GetMapping("/message")
	public  String  welcome() {
		return "Message from   Service";
	}
}
