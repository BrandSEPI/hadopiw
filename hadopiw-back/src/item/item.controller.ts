import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ConflictException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { Item } from './interfaces/item.interface';
import { Param, Put, Delete } from '@nestjs/common';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 409, description: 'Item already exists.' })
  async create(@Body() item: Item) {
    const existingItem = await this.itemService.findOne(item._id as string);
    if (existingItem) {
      throw new ConflictException('Item already exists');
    }
    return this.itemService.create(item);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated items.' })
  async findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ): Promise<Item[]> {
    return this.itemService.findAll(limit, skip);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async update(@Param('id') id: string, @Body() item: Item) {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async remove(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}
