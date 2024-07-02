import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "order_products"})
export class OrderProductEntity {

    @PrimaryGeneratedColumn('increment', { type: "int", name: "id"})
    id: number

    @Column({ type: "int", name: "orderId", nullable: false})
    orderId: number

    @Column({ type: "int", name: "productId", nullable: false})
    productId: number

    @Column({ type: "int", name: "amount", nullable: false})
    amount: number

    @Column({ type: 'decimal', name: 'price', precision: 10, scale: 2, nullable: false })
    price: number

    @CreateDateColumn({ type: Date, name: "createdAt", nullable: true})
    createdAt: Date

    @UpdateDateColumn({ type: Date, name: "updatedAt", nullable: true })
    updatedAt: Date

    @ManyToOne(() => OrderEntity, (order) => order.orderProduct)
    @JoinColumn({ name: "orderId", referencedColumnName: "id"})
    order: OrderEntity;

    @OneToMany(() => ProductEntity, (product) => product.orderProduct)
    @JoinColumn({ name: "productId", referencedColumnName: "id"})
    product: ProductEntity;
}
