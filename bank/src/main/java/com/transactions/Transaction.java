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

    @Nullable
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

    @Nullable
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
                       @Nullable @BsonProperty("type") String type,
                       @NonNull  @BsonProperty("amount") Double amount,
                       @Nullable @BsonProperty("nameOrig") String nameOrig,
                       @NonNull  @BsonProperty("oldbalanceOrg") Double oldbalanceOrg,
                       @NonNull  @BsonProperty("newbalanceOrig") Double newbalanceOrig,
                       @Nullable @BsonProperty("nameDest") String nameDest,
                       @NonNull  @BsonProperty("oldbalanceDest") Double oldbalanceDest,
                       @NonNull @BsonProperty("newbalanceDest") Double newbalanceDest,
                       @Nullable @BsonProperty("isFraud") Integer isFraud)

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
    @Nullable
    public String getType() {return type;}
    @Nullable
    public Double getAmount() {
        return amount;
    }
    @Nullable
    public String getNameOrig() {
        return nameOrig;
    }
    @Nullable
    public Double getOldbalanceOrg() {
        return oldbalanceOrg;
    }
    @Nullable
    public Double getNewbalanceOrig() {
        return newbalanceOrig;
    }
    @Nullable
    public String getNameDest() {
        return nameDest;
    }
    @Nullable
    public Double getOldbalanceDest() {
        return oldbalanceDest;
    }
    @Nullable
    public Double getNewbalanceDest() {
        return newbalanceDest;
    }
    @Nullable
    public Integer getIsFraud() {
        return isFraud;
    }
}