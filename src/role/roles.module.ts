import { Module } from '@nestjs/common';
import { RoleService } from './services/roles.service';
import { RoleController } from './controllers/roles.controller';
import { User_RoleController } from './controllers/user_role.controller';
import { User_RoleService } from './services/user_role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { User_Role } from './entities/user_role.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User_Role]), UsersModule],
  controllers: [RoleController, User_RoleController],
  providers: [RoleService, User_RoleService],
})
export class RoleModule { }
