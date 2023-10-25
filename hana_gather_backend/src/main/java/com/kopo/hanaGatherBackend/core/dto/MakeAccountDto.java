package com.kopo.hanaGatherBackend.core.dto;

public class MakeAccountDto {
    private String account;
    private Long balance;

    public MakeAccountDto(String account, Long balance) {
        this.account = account;
        this.balance = balance;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }
}
