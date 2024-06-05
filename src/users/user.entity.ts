import { Course } from "src/courses/entities/course.entity";
import { Enrollment } from "src/courses/entities/enrollment.entity";
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

    @OneToMany(() => Course, course => course.user)
    courses: Course[];

    @OneToMany(() => Enrollment, enrollment => enrollment.user)
    enrollments: Enrollment[];
}