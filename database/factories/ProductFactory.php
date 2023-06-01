<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'price' => fake()->numberBetween(100, 10000),
            'quantity' => fake()->numberBetween(1, 100),
            'collection_id' => rand(1, 5),
            'description' => fake()->text(),
            'img_url' => "https://via.placeholder.com/350x150"
        ];
    }
}
