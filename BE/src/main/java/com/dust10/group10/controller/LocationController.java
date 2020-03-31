package com.dust10.group10.controller;

import com.dust10.group10.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/location")
    public String locateStation() {
        return locationService.locateStation();
    }

    @GetMapping("/dust-status")
    public String measureDust() {
        return locationService.stationMeasure();
    }

    @GetMapping("/forecast")
    public String forecast() {
        return locationService.forecastDust();
    }
}
