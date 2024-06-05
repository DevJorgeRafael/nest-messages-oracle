import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto)
    }

    @Get()
    async getAll() {
        return this.coursesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.coursesService.getById(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.coursesService.remove(id);
    }
}
