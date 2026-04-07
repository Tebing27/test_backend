import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum Jurusan {
  INFORMATIKA = 'Informatika',
  SISTEM_INFORMASI = 'Sistem Informasi',
  TEKNIK_ELEKTRO = 'Teknik Elektro',
  MANAJEMEN = 'Manajemen',
}

export class CreateMahasiswaDto {
  @IsString()
  @IsNotEmpty()
  nim!: string;

  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsEnum(Jurusan)
  @IsNotEmpty()
  jurusan!: Jurusan;

  @IsDateString()
  @IsOptional()
  tanggal_lahir?: Date;
}
