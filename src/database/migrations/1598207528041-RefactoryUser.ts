import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RefactoryUser1598207528041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
      }),
    ]);

    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'region',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'city',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'region',
        type: 'varchar',
      }),
    ]);

    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
