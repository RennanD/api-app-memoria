import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveVerificationCodeToAccount1598217290970
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'verification_code');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'verification_code',
        type: 'int',
        isNullable: true,
        default: false,
      }),
    );
  }
}
