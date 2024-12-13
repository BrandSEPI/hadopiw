import { Document } from 'mongoose';

export interface Characteristic extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
}
