import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [PlacesResolver, PlacesService],
})
export class PlacesModule {}
