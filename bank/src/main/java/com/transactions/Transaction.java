package com.transactions;

import io.micronaut.core.annotation.Creator;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonCreator;
@Serdeable
public class Transaction {
    @Nullable
    @BsonProperty("step")
    private final Integer step;

    @Nullable
    @BsonProperty("type")
    private final String type;

    @NonNull
    @NotBlank
    @BsonProperty("amount")
    private final Double amount;

    @NonNull
    @NotBlank
    @BsonProperty("nameOrig")
    private final String nameOrig;

    @NonNull
    @NotBlank
    @BsonProperty("oldbalanceOrg")
    private final Double oldbalanceOrg;

    @NonNull
    @NotBlank
    @BsonProperty("newbalanceOrig")
    private final Double newbalanceOrig;

    @NonNull
    @NotBlank
    @BsonProperty("nameDest")
    private final String nameDest;

    @NonNull
    @NotBlank
    @BsonProperty("oldbalanceDest")
    private final Double oldbalanceDest;

    @NonNull
    @NotBlank
    @BsonProperty("newbalanceDest")
    private final Double newbalanceDest;

    @NonNull
    @NotBlank
    @BsonProperty("isFraud")
    private final Integer isFraud;
    public Transaction() {
        this(0, null, 0.0, null, 0.0, 0.0, null, 0.0, 0.0, 0);
    }
    @Creator
    @BsonCreator
    public Transaction(
            @Nullable @BsonProperty("step") Integer step,
            @NonNull @NotBlank @BsonProperty("type") String type,
            @NonNull @NotBlank @BsonProperty("amount") Double amount,
            @NonNull @NotBlank @BsonProperty("nameOrig") String nameOrig,
            @NonNull @NotBlank @BsonProperty("oldbalanceOrg") Double oldbalanceOrg,
            @NonNull @NotBlank @BsonProperty("newbalanceOrig") Double newbalanceOrig,
            @NonNull @NotBlank @BsonProperty("nameDest") String nameDest,
            @NonNull @NotBlank @BsonProperty("oldbalanceDest") Double oldbalanceDest,
            @NonNull @NotBlank @BsonProperty("newbalanceDest") Double newbalanceDest,
            @NonNull @NotBlank @BsonProperty("isFraud") Integer isFraud)

    {
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
    @Nullable
    public Integer getStep() {
        return step;
    }
    @NonNull
    @NotBlank
    public String getType() {return type;}
    @NonNull
    @NotBlank
    public Double getAmount() {
        return amount;
    }
    @NonNull
    @NotBlank
    public String getNameOrig() {
        return nameOrig;
    }
    @NonNull
    @NotBlank
    public Double getOldbalanceOrg() {
        return oldbalanceOrg;
    }
    @NonNull
    @NotBlank
    public Double getNewbalanceOrig() {
        return newbalanceOrig;
    }
    @NonNull
    @NotBlank
    public String getNameDest() {
        return nameDest;
    }
    @NonNull
    @NotBlank
    public Double getOldbalanceDest() {
        return oldbalanceDest;
    }
    @NonNull
    @NotBlank
    public Double getNewbalanceDest() {
        return newbalanceDest;
    }
    @NonNull
    @NotBlank
    public Integer getIsFraud() {
        return isFraud;
    }
}