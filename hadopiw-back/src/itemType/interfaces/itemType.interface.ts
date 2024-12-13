import { Document } from 'mongoose';

export interface ItemType extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
}
