import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE = 'numbers';

export class NumbersCreateTable1666682314852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: TABLE,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'number',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE);
  }
}
