package com.bank.transactions.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerIT {

  @Autowired MockMvc mockMvc;

  static final String GET_PATH = "http://localhost:8080/bank/transactions";
  @Test
  public void postTransaction_validData_returnsCreatedStatus() throws Exception {

    final var requestBody = """
                {
                    "step": 1,
                    "type": "CASH-IN",
                    "amount": 100,
                    "nameOrig": "CHRISTIAN",
                    "nameDest": "JUAN",
                    "isFraud": 0,
                    "oldBalanceDest": 0,
                    "newBalanceDest": 100,
                    "newBalanceOrig": 100,
                    "oldBalanceOrg": 200
                }
           """;
    mockMvc
        .perform(post(GET_PATH).contentType(APPLICATION_JSON_VALUE).content(requestBody))
        .andExpect(status().isCreated())
        .andReturn();
  }
}
