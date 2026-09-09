import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(dto);
    return this.todosRepository.save(todo);
  }
  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo | null> {
    return this.todosRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateTodoDto) {
    await this.todosRepository.update(id, dto);
    return this.todosRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
