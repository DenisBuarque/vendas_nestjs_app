import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1723037277677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '11',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    length: '14',
                    isUnique: true,
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
