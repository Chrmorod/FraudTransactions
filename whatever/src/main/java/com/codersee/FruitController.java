package com.codersee;

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

@Controller("/fruits")
@ExecuteOn(TaskExecutors.BLOCKING)
class FruitController {

    private final FruitRepository fruitService;

    FruitController(FruitRepository fruitService) {
        this.fruitService = fruitService;
    }

    @Get
    List<Fruit> list() {
        return fruitService.list();
    }

    @Post
    @Status(CREATED)
    void save(@NonNull @NotNull @Valid Fruit fruit) {
        fruitService.save(fruit);
    }
}