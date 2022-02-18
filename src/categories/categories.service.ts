import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private citiesRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = this.citiesRepository.create(createCategoryInput);
    const categoryCreate = await this.citiesRepository.save(category);

    if (!categoryCreate) {
      throw new InternalServerErrorException('Error creating category');
    }

    return categoryCreate;
  }

  async findAll() {
    const categories = await this.citiesRepository.find();

    return categories;
  }

  async findOne(id: string) {
    const category = await this.citiesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }

    return category;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
