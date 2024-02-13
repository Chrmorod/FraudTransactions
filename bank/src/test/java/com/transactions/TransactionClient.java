package com.transactions;

import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.client.annotation.Client;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Client("/transactions")
public interface TransactionClient {

    @Post
    @NonNull
    HttpStatus save(@NonNull @NotNull @Valid Transaction transaction);

    @NonNull
    @Get
    List<Transaction> findAll();
}
