package com.transactions;


import io.micronaut.core.annotation.NonNull;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Stream;

public interface TransactionRepository {

    @NonNull
    Stream<Transaction> stream();

    void save(@NonNull @NotNull @Valid Transaction transaction);
}