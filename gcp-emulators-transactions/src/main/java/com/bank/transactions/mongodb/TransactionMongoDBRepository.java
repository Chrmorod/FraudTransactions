package com.bank.transactions.mongodb;

import com.bank.transactions.model.business.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionMongoDBRepository extends MongoRepository<Transaction, String> {}
