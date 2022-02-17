import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => City)
  async createCity(
    @Args({ name: 'createCityInput' })
    createCityInput: CreateCityInput,
  ) {
    return await this.citiesService.create(createCityInput);
  }

  @Query(() => [City], { name: 'cities' })
  async findAll() {
    const cities = await this.citiesService.findAll();

    const citiesFormatted = cities.map((city) => ({
      ...city,
      bannerImageUrl: `${process.env.BASE_URL}/photos/${city.bannerImage}`,
    }));

    return citiesFormatted;
  }

  @Query(() => City, { name: 'city' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const city = await this.citiesService.findOne(id);

    return {
      ...city,
      bannerImageUrl: `${process.env.BASE_URL}/photos/${city.bannerImage}`,
    };
  }

  @Mutation(() => City)
  async updateCity(
    @Args('id') id: string,
    @Args('updateCityInput') updateCityInput: UpdateCityInput,
  ) {
    const cities = await this.citiesService.update(id, updateCityInput);

    return {
      ...cities,
      bannerImageUrl: `${process.env.BASE_URL}/photos/${cities.bannerImage}`,
    };
  }

  @Mutation(() => Boolean)
  async removeCity(@Args('id', { type: () => ID }) id: string) {
    return await this.citiesService.remove(id);
  }
}
