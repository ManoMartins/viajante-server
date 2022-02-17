import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findOne(id: string) {
    const city = this.citiesRepository.findOne(id);

    if (!city) {
      throw new InternalServerErrorException('Error finding city');
    }

    return city;
  }

  update(id: number, updateCityInput: UpdateCityInput) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
