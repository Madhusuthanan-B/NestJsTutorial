import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public addTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    public getAllTasks() {
        return this.tasks;
    }

    public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let results = [];
        if (status && search) {
            return this.tasks
                .filter((task) => task.status === status)
                .filter((task) => task.description.includes(search) || task.title.includes(search));
        }
        if (status) {
            results = this.tasks
                .filter((task) => task.status === status)
        }
        if (search) {
            results = this.tasks.filter((task) => task.description.includes(search) || task.title.includes(search))
        }
        return results;
    }

    public getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);
        if (!found) {
            throw new NotFoundException(`Taks with ID ${id} not found`);
        }
        return found;
    }

    public deleteTaskById(id: string): Task[] {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks;
    }

    public updateTaskStatus(id: string, status: TaskStatus) {
        const task: Task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
