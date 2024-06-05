import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/user.entity";
import { Enrollment } from "./enrollment.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.courses)
    user: User;

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[];

}
