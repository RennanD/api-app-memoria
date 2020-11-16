import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFriendToUserGenericDate1598311912696
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user_generic_dates', [
      new TableColumn({
        name: 'friend_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'relationship',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user_generic_dates', [
      new TableColumn({
        name: 'friend_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'relationship',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
