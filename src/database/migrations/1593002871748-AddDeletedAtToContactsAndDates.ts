import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeletedAtToContactsAndDates1593002871748
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contacts',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'important_dates',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contacts', 'deleted_at');
    await queryRunner.dropColumn('important_dates', 'deleted_at');
  }
}
