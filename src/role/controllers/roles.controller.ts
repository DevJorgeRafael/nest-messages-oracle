import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  getRoles() {
    return this.roleService.findAll();
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
