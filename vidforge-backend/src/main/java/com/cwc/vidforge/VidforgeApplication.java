package com.cwc.vidforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VidforgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(VidforgeApplication.class, args);
	}

}
