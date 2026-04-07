import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MahasiswaQueryDto } from './dto/mahasiswa-query.dto';
import { Mahasiswa } from './entities/mahasiswa.entity';

@UseGuards(JwtAuthGuard)
@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMahasiswaDto: CreateMahasiswaDto,
  ): Promise<Mahasiswa> {
    return this.mahasiswaService.create(createMahasiswaDto);
  }

  @Get()
  async findAll(@Query() query: MahasiswaQueryDto): Promise<{
    data: Mahasiswa[];
    meta: { total: number; page: number; limit: number; last_page: number };
  }> {
    return this.mahasiswaService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Mahasiswa> {
    return this.mahasiswaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ): Promise<Mahasiswa> {
    return this.mahasiswaService.update(id, updateMahasiswaDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.mahasiswaService.remove(id);
  }
}
