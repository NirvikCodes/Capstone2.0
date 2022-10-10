package com.capstone.userservice.payload.response;
import java.util.List;
public class UserInfoResponse {
    private int id;

    private String email;
    private List<String> roles;

    public UserInfoResponse(int id, String email, List<String> roles) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }
}
