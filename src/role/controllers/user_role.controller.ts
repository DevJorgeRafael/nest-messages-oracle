import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { createUser_RoleDto } from "../dto/create-user_role.dto";
import { User_RoleService } from "../services/user_role.service";
import { updateUser_RoleDto } from "../dto/update-user_role.dto";

@Controller('user_roles')
export class User_RoleController {
    constructor(private readonly user_RoleService: User_RoleService) { }

    @Post()
    createUser_Role(@Body() createUser_RoleDto: createUser_RoleDto) {
        return this.user_RoleService.create(createUser_RoleDto);
    }

    @Get()
    getUser_Roles() {
        return this.user_RoleService.findAll();
    }

    @Get('/:id')
    getUser_Role(@Param('id', ParseIntPipe) id: number) {
        return this.user_RoleService.findOne(id);
    }

    @Patch('/:id')
    updateUser_Role(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUser_RoleDto: updateUser_RoleDto
    ) {
        return this.user_RoleService.update(id, updateUser_RoleDto);
    }

    @Delete('/:id')
    deleteUser_Role(@Param('id', ParseIntPipe) id: number) {
        return this.user_RoleService.remove(id);
    }
}