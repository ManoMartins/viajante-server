import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category';
import { UpdateCategoryInput } from './dto/update-category';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async findAllCategory(): Promise<Category[]> {
    const categories = await this.categoryService.findAllCategory();
    return categories;
  }

  @Query(() => Category)
  async findCategoryById(@Args('id') id: string): Promise<Category> {
    const category = await this.categoryService.findCategoryById(id);

    return category;
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoryService.createCategory(data);

    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.categoryService.updateCategory(id, data);

    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.categoryService.deleteCategory(id);

    return deleted;
  }
}
