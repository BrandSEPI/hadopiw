import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacteristicService } from './characteristic.service';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicSchema } from './schemas/characteristic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Characteristic', schema: CharacteristicSchema }])],
  providers: [CharacteristicService],
  controllers: [CharacteristicController],
})
export class CharacteristicModule {}
