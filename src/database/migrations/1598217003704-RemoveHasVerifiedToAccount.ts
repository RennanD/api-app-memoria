import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveHasVerifiedToAccount1598217003704
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'has_verified');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'has_verified',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
  }
}
