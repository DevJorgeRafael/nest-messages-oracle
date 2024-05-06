import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  create(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role);
    return this.roleRepository.save(newRole);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        id
      }
    });

    if (!roleFound) return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return roleFound
  }

  async update(id: number, role: UpdateRoleDto) {
    const roleFound = await this.roleRepository.findOne({
      where:{ 
        id
      }
    })

    if(!roleFound) return new HttpException('Role not found', HttpStatus.NOT_FOUND)

    const updateRole = Object.assign(roleFound, role)
    return this.roleRepository.save(updateRole)
  }

  async remove(id: number) {
    const result = await this.roleRepository.delete({ id })
    if(result.affected === 0) return new HttpException('Role not found', HttpStatus.NOT_FOUND)
    return result
  }
}
