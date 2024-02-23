package com.bank.transactions.model.business;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transactions")
public class Transaction {
    private String id;
    private Integer step;
    private String type;
    private Double amount;
    private String nameOrig;
    private Double oldbalanceOrg;
    private Double newbalanceOrig;
    private String nameDest;
    private Double oldbalanceDest;
    private Double newbalanceDest;
    private Integer isFraud;

    public Transaction(String id, Integer step, String type , Double amount, String nameOrig, Double oldbalanceOrg, Double newbalanceOrig, String nameDest, Double oldbalanceDest, Double newbalanceDest, Integer isFraud) {
        this.id = id;
        this.step = step;
        this.type = type;
        this.amount = amount;
        this.nameOrig = nameOrig;
        this.oldbalanceOrg = oldbalanceOrg;
        this.newbalanceOrig = newbalanceOrig;
        this.nameDest = nameDest;
        this.oldbalanceDest = oldbalanceDest;
        this.newbalanceDest = newbalanceDest;
        this.isFraud = isFraud;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Integer getStep(){return step;}
    public String getType(){return type;}
    public Double getAmount(){return amount;}
    public String getNameOrig(){return nameOrig;}
    public Double getOldBalanceOrg(){return oldbalanceOrg;}
    public Double getNewBalanceOrig(){return newbalanceOrig;}
    public String getNameDest(){return nameDest;}
    public Double getOldBalanceDest(){return oldbalanceDest;}
    public Double getNewBalanceDest(){return newbalanceDest;}
    public Integer getIsFraud(){return isFraud;}
    public void setStep(Integer step) {
        this.step = step;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public void setNameOrig(String nameOrig){
        this.nameOrig = nameOrig;
    }
    public void setOldBalanceOrg(Double oldbalanceOrg){
        this.oldbalanceOrg = oldbalanceOrg;
    }
    public void setNewBalanceOrig(Double newbalanceOrig){
        this.newbalanceOrig = newbalanceOrig;
    }
    public void setNameDest(String nameDest){this.nameDest = nameDest;}
    public void setOldBalanceDest(Double oldbalanceDest){
        this.oldbalanceDest = oldbalanceDest;
    }
    public void setNewBalanceDest(Double newbalanceDest){
        this.newbalanceDest = newbalanceDest;
    }
    public void setIsFraud(Integer isFraud){this.isFraud = isFraud;}
}
