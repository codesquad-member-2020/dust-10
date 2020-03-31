package com.dust10.group10.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Location {
    private String xAxis;
    private String yAxis;

    @Builder
    public Location(String xAxis, String yAxis) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
    }
}
