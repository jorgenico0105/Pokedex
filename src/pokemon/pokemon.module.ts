import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { Elements, ElementsSchema } from './entities/elements.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Pokemon.name,
        schema:PokemonSchema,
      },
      {
        name:Elements.name,
        schema:ElementsSchema
      }
  ])
  ]
})
export class PokemonModule {}
