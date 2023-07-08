import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        this.logger.log(`Trying to retrive tasks`);
        return this.tasksService.getTasksWithFilters(filterDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        this.logger.log(`Trying to retrive the task ${id}`);
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    async addTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        this.logger.log(`Trying to delete the task ${id}`);
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        this.logger.log(`Trying to update the task ${id} with ${JSON.stringify(updateTaskStatusDto)}`);
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
} 
