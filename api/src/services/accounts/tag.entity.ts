import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
export default Tag;
