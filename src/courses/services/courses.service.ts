import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const user = await this.userRepository.findOne({
            where: { id: createCourseDto.userId },
            relations: ['userRoles', 'userRoles.role']
        });

        if (!user) throw new NotFoundException('User not found');

        // Verifica los roles del usuario
        const allowedRoles = ['Docente'];
        const userHasRole = user.userRoles.some(userRole => allowedRoles.includes(userRole.role.name));

        if (!userHasRole) {
            throw new ForbiddenException('Only users with roles "Docente" can create courses');
        }

        const courseFound = await this.courseRepository.findOne({
            where: {
                name: createCourseDto.name,
                user: { id: createCourseDto.userId },
            },
        });

        if (courseFound) {
            throw new ConflictException(`Course ${createCourseDto.name} already exists with teacher ${createCourseDto.userId}`);
        }

        const newCourse = this.courseRepository.create({
            ...createCourseDto,
            user,
        });
        return this.courseRepository.save(newCourse);
    }

    getAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    async getById(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id }
        })
        if (!course) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }
        return course;
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id }
        })
        if (!course) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }

        Object.assign(course, updateCourseDto);
        return this.courseRepository.save(course);
    }

    async remove(id: number): Promise<void> {
        const result = await this.courseRepository.delete(id);
        if (!result) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }
    }
}
