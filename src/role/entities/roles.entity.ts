import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User_Role } from "./user_role.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User_Role, userRole => userRole.role)
    userRoles: User_Role[];
}
