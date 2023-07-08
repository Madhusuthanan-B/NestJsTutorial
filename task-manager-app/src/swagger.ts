import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function enableSwagger(app: INestApplication<any>) {
    const config = new DocumentBuilder()
        .setTitle('Tasks example')
        .setDescription('The taks manager API description')
        .setVersion('1.0')
        .addTag('tasks')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}