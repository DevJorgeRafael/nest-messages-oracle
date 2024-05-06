import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createUser_RoleDto } from "../dto/create-user_role.dto";
import { updateUser_RoleDto } from "../dto/update-user_role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User_Role } from "../entities/user_role.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { RoleService } from "./roles.service";

@Injectable()
export class User_RoleService {
    constructor(
        @InjectRepository(User_Role) private user_roleRepository: Repository<User_Role>,
        private usersService: UsersService,
        private roleService: RoleService
    ) {}

    async create(user_role: createUser_RoleDto) {
        const userFound = await this.usersService.getUser(user_role.userId);
        if(!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);

        const roleFound = await this.roleService.findOne(user_role.roleId);
        if(!roleFound) return new HttpException('Role not found', HttpStatus.NOT_FOUND);

        const newUser_Role = this.user_roleRepository.create({
            user: userFound,
            role: roleFound
        });
        
        return this.user_roleRepository.save(newUser_Role);
    }

    findAll() {
        return this.user_roleRepository.find({ 
            relations: ['user', 'role'],
            order: { id: 'ASC' }
        });
    }

    async findOne(id: number) {
        const user_RoleFound = await this.user_roleRepository.findOne({
            where: { id: id },
            relations: ['user', 'role']
        });

        if (!user_RoleFound) return new HttpException('User_Role not found', HttpStatus.NOT_FOUND);

        return user_RoleFound;
    }


    async update(id: number, user_role: updateUser_RoleDto) {
        const user_roleFound = await this.user_roleRepository.findOne({
            where: {
                id
            },
            relations: ['user', 'role']
        })
        if (!user_roleFound) return new HttpException('User_Role not found', HttpStatus.NOT_FOUND);

        if (user_role.userId) {
            const user = await this.usersService.getUser(user_role.userId);
            if (user instanceof HttpException) {
                // handle error
            } else if (user) {
                user_roleFound.user = user;
            }
        }

        if (user_role.roleId) {
            const role = await this.roleService.findOne(user_role.roleId);
            if (role instanceof HttpException) {
                // handle error
            } else if (role) {
                user_roleFound.role = role;
            }
        }

        return this.user_roleRepository.save(user_roleFound);
    }



    async remove(id: number) {
        const result = await this.user_roleRepository.delete({ id });
        if(result.affected === 0) return new HttpException('User_Role not found', HttpStatus.NOT_FOUND);
        return result;
    }

}