import { Test, TestingModule } from '@nestjs/testing';
import { CitiesResolver } from './cities.resolver';
import { CitiesService } from './cities.service';

describe('CitiesResolver', () => {
  let resolver: CitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesResolver, CitiesService],
    }).compile();

    resolver = module.get<CitiesResolver>(CitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
