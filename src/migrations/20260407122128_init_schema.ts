import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // users table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 150).notNullable().unique();
    table.string('name', 150).notNullable();
    table.string('password', 255);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('register_date').defaultTo(knex.fn.now());
  });

  // data_mhs table
  await knex.schema.createTable('data_mhs', (table) => {
    table.increments('id').primary();
    table.string('nim', 20).notNullable().unique();
    table.string('nama', 100).notNullable();
    table.string('email', 100).unique();
    table
      .enum('jurusan', [
        'Informatika',
        'Sistem Informasi',
        'Teknik Elektro',
        'Manajemen',
      ])
      .notNullable();
    table.date('tanggal_lahir').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('data_mhs');
  await knex.schema.dropTableIfExists('users');
}
