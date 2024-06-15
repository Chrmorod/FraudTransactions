package com.bank.transactions.firestore;

import com.bank.transactions.model.entity.TransactionDocument;
import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends FirestoreReactiveRepository<TransactionDocument> {}