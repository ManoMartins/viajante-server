import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';

@Module({
  providers: [PlacesResolver, PlacesService],
})
export class PlacesModule {}
