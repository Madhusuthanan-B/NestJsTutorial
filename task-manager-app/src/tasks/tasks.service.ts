import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        private tasksRepository: TasksRepository
    ) { }

    public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    public async getTaskById(id: string): Promise<Task> {
        const record = await this.tasksRepository.findOne({ where: { id } });
        if (!record) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return record;
    }

    public getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    public async deleteTaskById(id: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.tasksRepository.delete({ id });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return result;
    }

    public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return await this.tasksRepository.save(task);
    }
}
