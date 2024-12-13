import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemType } from './interfaces/itemType.interface';

@Injectable()
export class ItemTypeService {
  constructor(@InjectModel('ItemType') private readonly itemTypeModel: Model<ItemType>) {}

  async create(itemType: ItemType): Promise<ItemType> {
    const createdItemType = new this.itemTypeModel(itemType);
    return createdItemType.save();
  }

  async findAll(limit: number, skip: number): Promise<ItemType[]> {
    return this.itemTypeModel.find().limit(limit).skip(skip).exec();
  }
  async findOne(id: string): Promise<ItemType> {
    return this.itemTypeModel.findById(id).exec();
  }

  async update(id: string, itemType: ItemType): Promise<ItemType> {
    return this.itemTypeModel.findByIdAndUpdate(id, itemType, { new: true }).exec();
  }

  async delete(id: string): Promise<ItemType> {
    return this.itemTypeModel.findByIdAndDelete(id).exec();
  }
}
