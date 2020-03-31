package com.dust10.group10.controller;

import com.dust10.group10.api.ApiResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    @GetMapping("/api/location")
    public ApiResult locateStation(@RequestParam(value = "tmX") String locateX,
                                   @RequestParam(value = "tmY") String locateY) {
        return ApiResult.locate(locateX, locateY);
    }
}
