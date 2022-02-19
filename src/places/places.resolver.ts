import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Mutation(() => Place)
  async createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
  ) {
    return await this.placesService.create(createPlaceInput);
  }

  @Query(() => [Place], { name: 'places' })
  findAll() {
    return this.placesService.findAll();
  }

  @Query(() => Place, { name: 'place' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.placesService.findOne(id);
  }

  @Mutation(() => Place)
  updatePlace(@Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput) {
    return this.placesService.update(updatePlaceInput.id, updatePlaceInput);
  }

  @Mutation(() => Place)
  removePlace(@Args('id', { type: () => Int }) id: number) {
    return this.placesService.remove(id);
  }
}
