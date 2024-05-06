import { User_Role } from "src/role/entities/user_role.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @OneToMany(() => User_Role, user_role => user_role.user)
    userRoles: User_Role[];
}