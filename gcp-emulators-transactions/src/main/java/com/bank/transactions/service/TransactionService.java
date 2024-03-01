package com.bank.transactions.service;

import com.bank.transactions.firestore.TransactionRepository;
import com.bank.transactions.model.exceptions.InvalidInputException;
import com.bank.transactions.model.business.Transaction;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.bank.transactions.model.entity.TransactionDocument;
import com.bank.transactions.mongodb.TransactionMongoDBRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.stream.Collectors;

@Service
public class TransactionService {

  private final TransactionRepository repository;
  private final TransactionMongoDBRepository mongodbrepository;

  public TransactionService(TransactionRepository repository, TransactionMongoDBRepository mongodbrepository) {

    this.repository = repository;
    this.mongodbrepository = mongodbrepository;
  }

  public Transaction get(String id) {

    if (!StringUtils.hasText(id)) {
      throw new InvalidInputException();
    }

    return repository
        .findById(id)
        .map(doc -> new Transaction(doc.getId(), doc.getStep(), doc.getType(),doc.getAmount(),doc.getNameOrig(),doc.getOldBalanceOrg(),doc.getNewBalanceOrig(),doc.getNameDest(),doc.getOldBalanceDest(),doc.getNewBalanceDest()))
        .block();
  }
  public Transaction add(Transaction trx) {

    TransactionDocument doc =
        Optional.ofNullable(trx)
            .map(t -> new TransactionDocument(t.getId(),t.getStep(),t.getType(),t.getAmount(),t.getNameOrig(),t.getOldBalanceOrg(),t.getNewBalanceOrig(),t.getNameDest(),t.getOldBalanceDest(),t.getNewBalanceDest()))
            .orElseThrow(InvalidInputException::new);

    final var id = Objects.requireNonNull(repository.save(doc).block()).getId();
    trx.setId(id);

    return trx;
  }
  public List<Transaction> getAllTransactions() {
    return repository.findAll().toStream()
            .map(doc -> new Transaction(
                    doc.getId(),
                    doc.getStep(),
                    doc.getType(),
                    doc.getAmount(),
                    doc.getNameOrig(),
                    doc.getOldBalanceOrg(),
                    doc.getNewBalanceOrig(),
                    doc.getNameDest(),
                    doc.getOldBalanceDest(),
                    doc.getNewBalanceDest()
            ))
            .collect(Collectors.toList());
  }
  public List<Transaction> getAllMongoDBTransactions(){
    return mongodbrepository.findAll();
  }
}
