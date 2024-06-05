import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EnrollmentsService } from '../services/enrollments.service';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Post()
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto)
    }

    @Get()
    async getAll() {
        return this.enrollmentsService.getAll()
    }

    @Get(':id')
    async getById(id: number) {
        return this.enrollmentsService.getById(id)
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
        return this.enrollmentsService.update(id, updateEnrollmentDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.enrollmentsService.remove(id)
    }
}
