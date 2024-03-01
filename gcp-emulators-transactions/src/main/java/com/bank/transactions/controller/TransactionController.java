package com.bank.transactions.controller;

import com.bank.transactions.model.exceptions.NotFoundException;
import com.bank.transactions.service.TransactionService;
import com.bank.transactions.model.business.Transaction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

  private final TransactionService trxsService;

  public TransactionController(TransactionService trxsService) {
    this.trxsService = trxsService;
  }
  @CrossOrigin(origins = "${CORS_ORIGIN_URL}") // Permitimos solicitudes desde http://localhost:3000
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Transaction create(@RequestBody Transaction trx) {
    return trxsService.add(trx);
  }

  @GetMapping("/{id}")
  public Transaction read(@PathVariable String id) {
    return Optional.ofNullable(trxsService.get(id)).orElseThrow(NotFoundException::new);
  }
  @GetMapping("/all")
  public List<Transaction> getAllTransactions() {
    return trxsService.getAllTransactions();
  }
  @CrossOrigin(origins = "${CORS_ORIGIN_URL}") // Permitimos solicitudes desde http://localhost:3000
  @GetMapping("/mongodb")
  public List<Transaction> getAllMongoDBTransactions() {
    return trxsService.getAllMongoDBTransactions();
  }
}
