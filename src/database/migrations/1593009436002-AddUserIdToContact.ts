import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIdToContact1593009436002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contacts',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contacts', 'user_id');
  }
}
