import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserPhoneTableName1592570893957
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('users_phone', 'account');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('account', 'users_phone');
  }
}
