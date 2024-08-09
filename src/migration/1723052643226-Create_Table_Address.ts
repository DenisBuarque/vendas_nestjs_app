import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableAddress1723052643226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adresses',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'zip_code',
            type: 'varchar',
            length: '9',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: true, // Complemento pode ser opcional
          },
          {
            name: 'district',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'house_number',
            type: 'varchar',
            length: '5',
          },
          {
            name: 'citId',
            type: 'integer',
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
      }),
    );

    // Criação das chaves estrangeiras
    await queryRunner.createForeignKey('adresses', new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cities', // Nome da tabela referenciada
        onDelete: 'CASCADE', // Ação quando a cidade é deletada
    }));

    await queryRunner.createForeignKey('adresses', new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users', // Nome da tabela referenciada
        onDelete: 'CASCADE', // Ação quando o usuário é deletado
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    // Remover as chaves estrangeiras
    const table = await queryRunner.getTable('adresses');
    const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.includes('city_id') || fk.columnNames.includes('user_id'));

    for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('adresses', fk);
    }

    await queryRunner.dropTable('adresses');
  }
}
