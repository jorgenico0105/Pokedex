import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Elements extends Document {
    @Prop({
        unique:true
    })
    name:string
    @Prop({
        unique:true
    })
    id:string
}

export const ElementsSchema=SchemaFactory.createForClass(Elements)