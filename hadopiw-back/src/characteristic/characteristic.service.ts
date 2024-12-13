import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characteristic } from './interfaces/characteristic.interface';

@Injectable()
export class CharacteristicService {
  constructor(@InjectModel('Characteristic') private readonly characteristicModel: Model<Characteristic>) {}

  async create(characteristic: Characteristic): Promise<Characteristic> {
    const createdCharacteristic = new this.characteristicModel(characteristic);
    return createdCharacteristic.save();
  }

  async findAll(limit: number, skip: number): Promise<Characteristic[]> {
    return this.characteristicModel.find().limit(limit).skip(skip).exec();
  }
  async findOne(id: string): Promise<Characteristic> {
    return this.characteristicModel.findById(id).exec();
  }

  async update(id: string, characteristic: Characteristic): Promise<Characteristic> {
    return this.characteristicModel.findByIdAndUpdate(id, characteristic, { new: true }).exec();
  }

  async delete(id: string): Promise<Characteristic> {
    return this.characteristicModel.findByIdAndDelete(id).exec();
  }
}
