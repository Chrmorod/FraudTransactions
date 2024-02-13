package com.transactions;

import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.annotation.*;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.stream.Stream;
import static io.micronaut.http.HttpStatus.CREATED;

@Controller("/transactions")
@ExecuteOn(TaskExecutors.BLOCKING)
class TransactionController {

    private final TransactionRepository transactionService;

    TransactionController(TransactionRepository transactionService) {
        this.transactionService = transactionService;
    }

    @Get
    Stream<Transaction> list() {
        return transactionService.stream();
    }

    @Post
    @Status(CREATED)
    void save(@NonNull @NotNull @Valid Transaction transaction) {
        transactionService.save(transaction);
    }
}
