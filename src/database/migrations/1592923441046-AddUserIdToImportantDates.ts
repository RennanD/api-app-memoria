import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIdToImportantDates1592923441046
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'important_dates',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('important_dates', 'user_id');
  }
}
