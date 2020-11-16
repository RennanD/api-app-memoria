import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveRelationShipToContact1601569398905
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contacts', 'relationship');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contacts',
      new TableColumn({
        name: 'relationship',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
