package com.transactions;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.micronaut.core.annotation.NonNull;
import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Singleton
public class MongoDbTransactionRepository implements TransactionRepository {

    private final MongoDbConfiguration mongoConf;
    private final MongoClient mongoClient;

    public MongoDbTransactionRepository(MongoDbConfiguration mongoConf,
                                        MongoClient mongoClient) {
        this.mongoConf = mongoConf;
        this.mongoClient = mongoClient;
    }

    @Override
    public void save(Transaction transaction) {
        MongoDatabase database = mongoClient.getDatabase(mongoConf.getName());
        MongoCollection<Transaction> collection = database.getCollection(mongoConf.getCollection(), Transaction.class);
    }

    @Override
    @NonNull
    public Stream<Transaction> stream() {
        MongoDatabase database = mongoClient.getDatabase(mongoConf.getName());
        MongoCollection<Transaction> collection = database.getCollection(mongoConf.getCollection(), Transaction.class);
        return collection.find().into(new ArrayList<>()).stream();
    }

    @NonNull
    private MongoCollection<Transaction> getCollection() {
        return mongoClient.getDatabase(mongoConf.getName())
                .getCollection(mongoConf.getCollection(), Transaction.class);
    }
}
