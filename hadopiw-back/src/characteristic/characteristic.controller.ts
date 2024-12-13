import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ConflictException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CharacteristicService } from './characteristic.service';
import { Characteristic } from './interfaces/characteristic.interface';
import { Param, Put, Delete } from '@nestjs/common';

@ApiTags('characteristic')
@Controller('characteristic')
export class CharacteristicController {
  constructor(private readonly characteristicService: CharacteristicService) {}

  @Post()
  @ApiOperation({ summary: 'Create characteristic' })
  @ApiResponse({
    status: 201,
    description: 'The characteristic has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Characteristic already exists.' })
  async create(@Body() characteristic: Characteristic) {
    const existingCharacteristic = await this.characteristicService.findOne(characteristic._id as string);
    if (existingCharacteristic) {
      throw new ConflictException('Characteristic already exists');
    }
    return this.characteristicService.create(characteristic);
  }

  @Get()
  @ApiOperation({ summary: 'Get all characteristics with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated characteristics.' })
  async findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<Characteristic[]> {
    return this.characteristicService.findAll(limit, skip);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get characteristic by id' })
  @ApiResponse({ status: 200, description: 'Return the characteristic.' })
  @ApiResponse({ status: 404, description: 'Characteristic not found.' })
  async findOne(@Param('id') id: string): Promise<Characteristic> {
    return this.characteristicService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update characteristic' })
  @ApiResponse({
    status: 200,
    description: 'The characteristic has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Characteristic not found.' })
  async update(@Param('id') id: string, @Body() characteristic: Characteristic) {
    return this.characteristicService.update(id, characteristic);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete characteristic' })
  @ApiResponse({
    status: 200,
    description: 'The characteristic has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Characteristic not found.' })
  async remove(@Param('id') id: string) {
    return this.characteristicService.delete(id);
  }
}
