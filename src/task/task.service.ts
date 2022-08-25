import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({});
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id, title, desc } = updateTaskDto;
    const task = await this.taskRepository.findOneBy({ id });

    task.title = title;
    task.desc = desc;

    return this.taskRepository.save(task);
  }

  async delete(id: string): Promise<any> {
    return this.taskRepository.delete(id);
  }
}
