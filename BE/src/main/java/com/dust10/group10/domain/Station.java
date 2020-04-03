package com.dust10.group10.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Station {

    private String stationName;

    public Station(String stationName) {
        this.stationName = stationName;
    }
}
