import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Session } from "../../sessions/entities/session.entity.js";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar'})
    username : string

    @Column({type : 'varchar'})
    email : string

    @Column({type : 'varchar'})
    password : string

    @OneToMany(() => Session, (session) => session.user)
    sessions : Relation<Session[]>

}
