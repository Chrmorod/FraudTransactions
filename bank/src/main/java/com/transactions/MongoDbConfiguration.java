package com.transactions;
import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.naming.Named;

@ConfigurationProperties("mongodb")
public interface MongoDbConfiguration extends Named {
    @NonNull
    String getCollection();
}