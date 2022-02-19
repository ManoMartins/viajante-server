import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  async create(createPlaceInput: CreatePlaceInput) {
    const city = this.placesRepository.create({
      ...createPlaceInput,
    });
    const cityCreate = await this.placesRepository.save(city);

    if (!cityCreate) {
      throw new InternalServerErrorException('Error creating place');
    }

    return cityCreate;
  }

  findAll() {
    return `This action returns all places`;
  }

  async findOne(id: string) {
    const place = await this.placesRepository.findOne({
      where: { id },
    });

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    console.log(place);

    return place;
  }

  update(id: number, updatePlaceInput: UpdatePlaceInput) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
