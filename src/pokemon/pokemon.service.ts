import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { retry } from 'rxjs';


@Injectable()
export class PokemonService {

  constructor(    
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>)
    {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name=createPokemonDto.name.toLocaleLowerCase()
    const pokemonExist=await this.pokemonModel.findOne({name:createPokemonDto.name}).exec()
    try {
      if(pokemonExist){
        throw new BadRequestException( `Pokemon ${createPokemonDto.name} already exists`)
     }
     const pokemon=await this.pokemonModel.create(createPokemonDto) 
     return pokemon
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    return await this.pokemonModel.find().exec()
  }

  async findOne(id: string) {
    try {
      const pokemon= await this.pokemonModel.findById(id).exec()
      console.log(pokemon);
      if(!pokemon){
        throw new BadRequestException(`Pokemon with id ${id} not found`)
      }
      return pokemon;
    } catch (error) {
      throw new BadRequestException(error.message) 
    }
  }
  async findByName(name: string) {
    try {
      const pokemon= await this.pokemonModel.findOne({name:name.toLocaleLowerCase()})
      if(!pokemon){
        throw new BadRequestException(`Pokemon with name ${name} not found`)
      }
      return pokemon;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.pokemonModel.findById(id).exec();
    const number = updatePokemonDto.no;
    try {
      if (number) {
        const pokemonExist = await this.pokemonModel.findOne({ no: number }).exec();
        if (pokemonExist) {
          throw new BadRequestException(`Pokemon with number ${number} already exists`);
        }
      }
      if (!pokemon) {
        throw new BadRequestException(`Pokemon with id ${id} not found`);
      }
      await this.pokemonModel.updateOne({ _id: id }, updatePokemonDto).exec();
      return await this.pokemonModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  remove(id: string) {
    return this.pokemonModel.deleteOne({_id:id}).exec();
  }
}
