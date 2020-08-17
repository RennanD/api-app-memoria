import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemovePhoneColumnInUser1592493731952
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phone');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
