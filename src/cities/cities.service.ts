import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'node:fs';
import { finished } from 'stream/promises';
import { Repository } from 'typeorm';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  async create(createCityInput: CreateCityInput): Promise<City> {
    const { createReadStream, filename } = await createCityInput.bannerImage;

    const stream = createReadStream();

    const out = createWriteStream(`./uploads/${filename}`);
    stream.pipe(out);
    await finished(out);

    const newCity = {
      ...createCityInput,
      bannerImage: filename,
    };

    const city = this.citiesRepository.create(newCity);
    const cityCreate = await this.citiesRepository.save(city);

    if (!cityCreate) {
      throw new InternalServerErrorException('Error creating city');
    }

    return cityCreate;
  }

  async findAll(): Promise<City[]> {
    const cities = await this.citiesRepository.find();

    return cities;
  }

  async findOne(id: string) {
    const city = await this.citiesRepository.findOne(id);

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }

  update(id: number, updateCityInput: UpdateCityInput) {
    return `This action updates a #${id} city`;
  }

  async remove(id: string): Promise<boolean> {
    const city = await this.citiesRepository.findOne(id);

    if (!city) {
      throw new NotFoundException('City not found');
    }

    const cityRemove = await this.citiesRepository.remove(city);
    console.log(city);
    if (!cityRemove) return false;

    return true;
  }
}
