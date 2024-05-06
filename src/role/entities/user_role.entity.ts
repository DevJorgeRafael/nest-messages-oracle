import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.entity";

@Entity({ name: 'user_role' })
export class User_Role {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: 'userId'})
    user: User;

    @ManyToOne(() => Role, role => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    role:Role;
}