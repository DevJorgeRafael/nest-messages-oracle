import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/roles.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "oracle",
      host: "localhost",
      port: 1521,
      username: 'developer',
      password: 'Salsa123',
      serviceName: 'XEPDB1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }
),
    UsersModule,
    RoleModule,
    CoursesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
