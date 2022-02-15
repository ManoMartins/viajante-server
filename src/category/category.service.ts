import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category';
import { UpdateCategoryInput } from './dto/update-category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAllCategory(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(data);
    const categoryCreate = await this.categoryRepository.save(category);

    if (!categoryCreate) {
      throw new InternalServerErrorException('Error creating category');
    }

    return categoryCreate;
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.update(category, {
      ...data,
    });

    const categoryUpdate = this.categoryRepository.create({
      ...category,
      ...data,
    });

    if (!categoryUpdate) {
      throw new InternalServerErrorException('Error updating category');
    }

    return categoryUpdate;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const deleted = await this.categoryRepository.delete(category);

    if (!deleted) return false;

    return true;
  }
}
