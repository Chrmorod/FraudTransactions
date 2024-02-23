package com.bank.transactions.model.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.spring.data.firestore.Document;
import com.google.type.Decimal;

@Document(collectionName = "transactions")
public class TransactionDocument {

  @DocumentId private String id;
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
  public TransactionDocument() {
    super();
  }

  public TransactionDocument(String id, Integer step, String type, Double amount, String nameOrig, Double oldbalanceOrg, Double newbalanceOrig, String nameDest, Double oldbalanceDest, Double newbalanceDest, Integer isFraud) {
    this.id=id;
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
  public String getId(){return id;}
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

}
