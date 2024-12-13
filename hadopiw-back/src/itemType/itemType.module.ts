import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemTypeService } from './itemType.service';
import { ItemTypeController } from './itemType.controller';
import { ItemTypeSchema } from './schemas/itemType.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ItemType', schema: ItemTypeSchema }])],
  providers: [ItemTypeService],
  controllers: [ItemTypeController],
})
export class ItemTypeModule {}
