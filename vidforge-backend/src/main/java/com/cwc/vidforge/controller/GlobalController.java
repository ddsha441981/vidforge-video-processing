package com.cwc.vidforge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("/api")
public class GlobalController {

    @GetMapping
    @ResponseBody
    public String welcomePage() {
        return "API working fine";
    }

}
