import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { KnexService } from '../database/knex.service';
import { MahasiswaQueryDto } from './dto/mahasiswa-query.dto';
import { Mahasiswa } from './entities/mahasiswa.entity';

@Injectable()
export class MahasiswaService {
  constructor(private readonly knexService: KnexService) {}

  async create(createMahasiswaDto: CreateMahasiswaDto): Promise<Mahasiswa> {
    const { email, nim } = createMahasiswaDto;

    const existing = await this.knexService
      .connection('data_mhs')
      .where({ email })
      .orWhere({ nim })
      .first<Mahasiswa | undefined>();

    if (existing) {
      if (existing.email === email) {
        throw new ConflictException('email already exists');
      }
      if (existing.nim === nim) {
        throw new ConflictException('nim already exists');
      }
    }

    const [mahasiswa] = await this.knexService
      .connection('data_mhs')
      .insert(createMahasiswaDto)
      .returning<Mahasiswa[]>('*');

    return mahasiswa;
  }

  async findAll(query: MahasiswaQueryDto): Promise<{
    data: Mahasiswa[];
    meta: { total: number; page: number; limit: number; last_page: number };
  }> {
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const offset = (page - 1) * limit;

    const qb = this.knexService.connection('data_mhs').select<Mahasiswa[]>('*');
    const countQb = this.knexService
      .connection('data_mhs')
      .count<{ total: string | number }[]>('id as total');

    if (query.nim) {
      qb.where('nim', 'ilike', `%${query.nim}%`);
      countQb.where('nim', 'ilike', `%${query.nim}%`);
    }
    if (query.nama) {
      qb.where('nama', 'ilike', `%${query.nama}%`);
      countQb.where('nama', 'ilike', `%${query.nama}%`);
    }
    if (query.email) {
      qb.where('email', 'ilike', `%${query.email}%`);
      countQb.where('email', 'ilike', `%${query.email}%`);
    }
    if (query.jurusan) {
      qb.where('jurusan', query.jurusan);
      countQb.where('jurusan', query.jurusan);
    }

    qb.limit(limit).offset(offset);

    const [{ total }] = await countQb;
    const data = await qb;

    return {
      data,
      meta: {
        total: Number(total),
        page: page,
        limit: limit,
        last_page: Math.ceil(Number(total) / limit),
      },
    };
  }

  async findOne(id: number): Promise<Mahasiswa> {
    const mahasiswa = await this.knexService
      .connection('data_mhs')
      .where({ id })
      .first<Mahasiswa | undefined>();

    if (!mahasiswa) {
      throw new NotFoundException(`Mahasiswa with ID ${id} not found`);
    }

    return mahasiswa;
  }

  async update(
    id: number,
    updateMahasiswaDto: UpdateMahasiswaDto,
  ): Promise<Mahasiswa> {
    const mahasiswa = await this.knexService
      .connection('data_mhs')
      .where({ id })
      .first<Mahasiswa | undefined>();

    if (!mahasiswa) {
      throw new NotFoundException(`Mahasiswa with ID ${id} not found`);
    }

    if (
      updateMahasiswaDto.email &&
      updateMahasiswaDto.email !== mahasiswa.email
    ) {
      const existing = await this.knexService
        .connection('data_mhs')
        .where({ email: updateMahasiswaDto.email })
        .first<Mahasiswa | undefined>();

      if (existing) throw new ConflictException('email already exists');
    }

    if (updateMahasiswaDto.nim && updateMahasiswaDto.nim !== mahasiswa.nim) {
      const existing = await this.knexService
        .connection('data_mhs')
        .where({ nim: updateMahasiswaDto.nim })
        .first<Mahasiswa | undefined>();

      if (existing) throw new ConflictException('nim already exists');
    }

    const updateData: Partial<Mahasiswa> = {
      ...updateMahasiswaDto,
      updated_at: new Date(),
    };

    const [updated] = await this.knexService
      .connection('data_mhs')
      .where({ id })
      .update(updateData)
      .returning<Mahasiswa[]>('*');

    return updated;
  }

  async remove(id: number): Promise<{ message: string }> {
    const mahasiswa = await this.knexService
      .connection('data_mhs')
      .where({ id })
      .first<Mahasiswa | undefined>();

    if (!mahasiswa) {
      throw new NotFoundException(`Mahasiswa with ID ${id} not found`);
    }

    await this.knexService.connection('data_mhs').where({ id }).del();
    return { message: `Mahasiswa with ID ${id} successfully deleted` };
  }
}
