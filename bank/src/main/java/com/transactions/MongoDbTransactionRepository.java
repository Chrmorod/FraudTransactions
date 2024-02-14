package com.transactions;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import io.micronaut.core.annotation.NonNull;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
@Singleton
public class MongoDbTransactionRepository implements TransactionRepository {
        private final MongoDbConfiguration mongoConf;
        private final MongoClient mongoClient;

        public MongoDbTransactionRepository(MongoDbConfiguration mongoConf, MongoClient mongoClient) {
            this.mongoConf = mongoConf;
            this.mongoClient = mongoClient;
        }

        @Override
        public void save(@NonNull @NotNull @Valid Transaction transaction) {
            getCollection().insertOne(transaction);
        }

        @Override
        @NonNull
        public List<Transaction> list() {
            return getCollection().find().into(new ArrayList<>());
        }

        @NonNull
        private MongoCollection<Transaction> getCollection() {
            return mongoClient.getDatabase(mongoConf.getName())
                    .getCollection(mongoConf.getCollection(), Transaction.class);
        }
}

