package com.example.backend.entity.pojo;

import java.util.Date;

public class ReservationPojo {
    private Date startTime;
    private Date endTime;
    private Integer numberOfParty;

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getNumberOfParty() {
        return numberOfParty;
    }

    public void setNumberOfParty(Integer numberOfParty) {
        this.numberOfParty = numberOfParty;
    }
}
