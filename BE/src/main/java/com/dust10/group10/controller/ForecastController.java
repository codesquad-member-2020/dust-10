package com.dust10.group10.controller;

import com.dust10.group10.api.ApiResponse;
import com.dust10.group10.domain.DustStatus;
import com.dust10.group10.domain.Station;
import com.dust10.group10.service.ForecastService;
import com.dust10.group10.service.LocationService;
import com.google.gson.JsonArray;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ForecastController {

    private final LocationService locationService;
    private final ForecastService forecastService;

    @GetMapping("/location")
    public ApiResponse locateStation(@RequestParam(value = "longitude") double xAxis,
                                @RequestParam(value = "latitude") double yAxis) {
        try {
            return new ApiResponse(HttpStatus.OK, 200, locationService.locateStation(xAxis, yAxis));
        } catch (IOException e) {
            return new ApiResponse(HttpStatus.BAD_REQUEST, 400);
        }
    }

    @GetMapping("/dust-status")
    public ApiResponse measureDust(@RequestParam(value = "stationName") String stationName) {
        try {
            return new ApiResponse(HttpStatus.OK, 200, forecastService.measureDust(stationName));
        } catch (IOException e) {
            return new ApiResponse(HttpStatus.BAD_REQUEST, 400);
        }
    }

    @GetMapping("/forecast")
    public String forecast() {
        return forecastService.forecastDust();
    }
}
