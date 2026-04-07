import { Jurusan } from '../dto/create-mahasiswa.dto';

export interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir: Date | null;
  created_at: Date;
  updated_at: Date;
}
