import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ConflictException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemTypeService } from './itemType.service';
import { ItemType } from './interfaces/itemType.interface';
import { Param, Put, Delete } from '@nestjs/common';

@ApiTags('itemType')
@Controller('itemType')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create itemType' })
  @ApiResponse({
    status: 201,
    description: 'The itemType has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'ItemType already exists.' })
  async create(@Body() itemType: ItemType) {
    const existingItemType = await this.itemTypeService.findOne(itemType._id as string);
    if (existingItemType) {
      throw new ConflictException('ItemType already exists');
    }
    return this.itemTypeService.create(itemType);
  }

  @Get()
  @ApiOperation({ summary: 'Get all itemTypes with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated itemTypes.' })
  async findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<ItemType[]> {
    return this.itemTypeService.findAll(limit, skip);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get itemType by id' })
  @ApiResponse({ status: 200, description: 'Return the itemType.' })
  @ApiResponse({ status: 404, description: 'ItemType not found.' })
  async findOne(@Param('id') id: string): Promise<ItemType> {
    return this.itemTypeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update itemType' })
  @ApiResponse({
    status: 200,
    description: 'The itemType has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'ItemType not found.' })
  async update(@Param('id') id: string, @Body() itemType: ItemType) {
    return this.itemTypeService.update(id, itemType);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete itemType' })
  @ApiResponse({
    status: 200,
    description: 'The itemType has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'ItemType not found.' })
  async remove(@Param('id') id: string) {
    return this.itemTypeService.delete(id);
  }
}
