import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { EnrollmentsService } from './services/enrollments.service';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { User } from '../users/user.entity';  // Asegúrate de importar User
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Enrollment, User]),
    UsersModule,
  ],
  controllers: [CoursesController, EnrollmentsController],
  providers: [CoursesService, EnrollmentsService],
})
export class CoursesModule { }
