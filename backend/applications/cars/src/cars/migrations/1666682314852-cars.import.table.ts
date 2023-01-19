import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import axios from 'axios';
import { Car } from '../entities/car.entity';

const TABLE = 'cars';

export class CarsImportTable1666682314852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    try {
      const repo = queryRunner.connection.getRepository(Car);

      for (let i = 0; i < 100; i++) {
        const {
          data: { records },
        } = await axios.get(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&sort=modifiedon&facet=make&facet=model&rows=100&start=${
            i * 100
          }`,
        );
        const result = [];

        records.forEach(({ fields: { model, make } }) => {
          result.push({
            model,
            make,
            price: (Math.floor(Math.random() * 10) + 1) * 10000,
          });
        });

        await repo.insert(result);
      }
    } catch (e: any) {
      console.log(e, e.response);
      throw new Error();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE);
  }
}
