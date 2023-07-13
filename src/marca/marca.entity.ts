import {Entity,Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Marca{
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

}