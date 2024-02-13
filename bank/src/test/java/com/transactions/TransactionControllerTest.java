package com.transactions;

import io.micronaut.http.HttpStatus;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import static io.micronaut.http.HttpStatus.CREATED;
import static org.junit.jupiter.api.Assertions.assertEquals;


@MicronautTest
public class TransactionControllerTest {

    @Inject
    TransactionClient transactionClient;

    @Test
    void transactionEndpointInteractsWithMongo() {
        HttpStatus status = transactionClient.save(new Transaction(1,"PAYMENT",100.00,"PACO",100.00,0.00,"GONZALO",0.00,100.00,0));
        assertEquals(CREATED, status);
    }
}