import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { CharacteristicModule } from './characteristic/characteristic.module';
import { ItemTypeModule } from './itemType/itemType.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    ItemModule,
    CharacteristicModule,
    ItemTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
