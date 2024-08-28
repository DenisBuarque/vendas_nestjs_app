import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableCart1724846826242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'carts',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'userId',
                    type: 'integer',
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

        // Criação da chave estrangeira para `user_id`
        await queryRunner.createForeignKey('carts', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users', // Nome da tabela referenciada
            onDelete: 'CASCADE', // Ação quando o estado é deletado
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira
        const table = await queryRunner.getTable('carts');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('carts', foreignKey);

        // Remover a tabela `carts`
        await queryRunner.dropTable('carts');
    }

}
