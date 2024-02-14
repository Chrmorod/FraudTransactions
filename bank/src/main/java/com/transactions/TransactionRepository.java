package com.transactions;
import io.micronaut.core.annotation.NonNull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
public interface TransactionRepository {
    @NonNull
    List<Transaction> list();
    void save(@NonNull @NotNull @Valid Transaction transaction);
}
