import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'task-management',
      autoLoadEntities: true,
      entities: [Task],
      // Always let the typeorm keep the database schema in sync.
      // Otherwise we have to rely on manual migrations
      synchronize: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
