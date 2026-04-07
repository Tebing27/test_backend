import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator';
import { Jurusan } from './create-mahasiswa.dto';

export class MahasiswaQueryDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  nim?: string;

  @IsString()
  @IsOptional()
  nama?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsEnum(Jurusan)
  @IsOptional()
  jurusan?: Jurusan;
}
