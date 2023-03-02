import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TABLE = 'numberUser';

export class NumberUserCreateTable1666682314852 implements MigrationInterface {
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
            name: 'numberId',
            type: 'int',
          },
          {
            name: 'paymentId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      TABLE,
      new TableForeignKey({
        columnNames: ['numberId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'numbers',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE);
  }
}
