import { MigrationInterface, QueryRunner, Table, TableForeignKey  } from "typeorm";

export class CreateTableCity1723052671842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cities',
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
                    length: '100',
                },
                {
                    name: 'stateId',
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

        // Criação da chave estrangeira para `state_id`
        await queryRunner.createForeignKey('cities', new TableForeignKey({
            columnNames: ['stateId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'states', // Nome da tabela referenciada
            onDelete: 'CASCADE', // Ação quando o estado é deletado
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // Remover a chave estrangeira
        const table = await queryRunner.getTable('cities');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('stateId') !== -1);
        await queryRunner.dropForeignKey('cities', foreignKey);

        // Remover a tabela `city`
        await queryRunner.dropTable('cities');

    }

}
