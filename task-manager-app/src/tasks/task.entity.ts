import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { IsUUID } from "class-validator";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}