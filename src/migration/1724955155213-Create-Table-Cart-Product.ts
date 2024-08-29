import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableCartProduct1724955155213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'cartId',
            type: 'integer',
          },
          {
            name: 'productId',
            type: 'integer',
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
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
    await queryRunner.createForeignKey(
      'cart_products',
      new TableForeignKey({
        columnNames: ['cartId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carts', // Nome da tabela referenciada
        onDelete: 'CASCADE', // Ação quando a cidade é deletada
      }),
    );

    await queryRunner.createForeignKey(
      'cart_products',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products', // Nome da tabela referenciada
        onDelete: 'CASCADE', // Ação quando o usuário é deletado
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover as chaves estrangeiras
    const table = await queryRunner.getTable('cart_products');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.includes('cartId') ||
        fk.columnNames.includes('productId'),
    );

    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKey('cart_products', fk);
    }

    await queryRunner.dropTable('cart_products');
  }
}
