import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async indOne(@Args('id', { type: () => ID }) id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoriesService.update(id, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  async removeCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoriesService.remove(id);
  }
}
