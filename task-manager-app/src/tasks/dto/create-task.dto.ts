import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @MaxLength(20, {
        message: 'Title is too long',
    })
    title: string;

    @IsNotEmpty()
    @MaxLength(50, {
        message: 'Description is too long',
    })
    description: string;
}