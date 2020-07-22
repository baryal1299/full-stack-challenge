import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, Unique } from "typeorm";
import Tag from './tag.entity';

@Entity()
@Unique(["email"])
class Account {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name_first: string;

    @Column()
    public name_last: string;

    @Column()
    public employer: string;

    @Column()
    public phone: string;

    @Column()
    public email: string;

    @Column()
    public address: string;

    @Column()
    public picture: string;

    @Column({ type: "numeric", precision: 15, scale: 4 })
    public balance: number;

    @Column()
    public credit: number;

    @Column()
    public comments: string;

    @CreateDateColumn()
    public created: Date;

    @ManyToMany(type => Tag, {cascade: true})
    @JoinTable()
    public tags: Tag[];

}

export default Account;