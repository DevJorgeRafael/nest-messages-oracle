import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ){}

    async create(createCourseDto: CreateCourseDto) {
        const courseFound = await this.courseRepository.findOne({
            where: {
                name: createCourseDto.name,
                user: { id: createCourseDto.userId },
            },
        });
        if (courseFound) {
            throw new ConflictException(`Course ${createCourseDto.name} already exists with teacher ${createCourseDto.userId}`)
        }
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
