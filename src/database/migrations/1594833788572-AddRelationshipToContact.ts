import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRelationshipToContact1594833788572
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contacts',
      new TableColumn({
        name: 'relationship',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contacts', 'relationship');
  }
}
