import { Module } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodosService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodoController],
  exports: [TypeOrmModule],
})
export class TodoModule {}
