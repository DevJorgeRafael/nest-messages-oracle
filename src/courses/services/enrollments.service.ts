import { Injectable, NotFoundException, ConflictException, HttpException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto';
import { User } from '../../users/user.entity';
import { Course } from '../entities/course.entity';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        const user = await this.userRepository.findOne({
            where: { id: createEnrollmentDto.userId },
            relations: ['userRoles', 'userRoles.role']
        });
        const course = await this.courseRepository.findOne({ where: { id: createEnrollmentDto.courseId } });

        if (!user ) throw new HttpException('User not found', 404);

        // Verifica los roles del usuario
        const allowedRoles = ['Estudiante'];
        const userHasRole = user.userRoles.some(userRole => allowedRoles.includes(userRole.role.name));

        if (!userHasRole) {
            throw new ForbiddenException('Only users with roles "Estudiante" can create enrollments');
        }

        if (!course) throw new HttpException('Course not found', 404);

        const enrollmentFound = await this.enrollmentRepository.findOne({
            where: {
                user: { id: createEnrollmentDto.userId },
                course: { id: createEnrollmentDto.courseId },
            },
        });
        if (enrollmentFound) {
            throw new ConflictException('Enrollment already exists');
        }

        const newEnrollment = this.enrollmentRepository.create({
            user,
            course,
        });

        return this.enrollmentRepository.save(newEnrollment);
    }

    getAll(): Promise<Enrollment[]> {
        return this.enrollmentRepository.find();
    }

    async getById(id: number): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { id },
        });
        if (!enrollment) {
            throw new NotFoundException(`Enrollment with ${id} not found`);
        }
        return enrollment;
    }

    async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { id },
        });
        if (!enrollment) {
            throw new NotFoundException(`Enrollment with ${id} not found`);
        }

        Object.assign(enrollment, updateEnrollmentDto);
        return this.enrollmentRepository.save(enrollment);
    }

    async remove(id: number): Promise<void> {
        const result = await this.enrollmentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Enrollment with ${id} not found`);
        }
    }
}
