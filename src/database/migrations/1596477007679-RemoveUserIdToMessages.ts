import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveUserIdToMessages1596477007679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('messages', 'user_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
