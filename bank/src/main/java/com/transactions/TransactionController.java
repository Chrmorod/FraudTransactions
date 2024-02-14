package com.transactions;

import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Status;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import static io.micronaut.http.HttpStatus.CREATED;

@Controller("/transactions")
@ExecuteOn(TaskExecutors.BLOCKING)
class TransactionController {

    private final TransactionRepository transactionService;

    TransactionController(TransactionRepository transactionService) {
        this.transactionService = transactionService;
    }

    @Get
    List<Transaction> list() {
        return transactionService.list();
    }

    @Post
    @Status(CREATED)
    void save(@NonNull @NotNull @Valid Transaction transaction) {
        transactionService.save(transaction);
    }
}