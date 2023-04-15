import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { ApolloDriver } from '@nestjs/apollo';

import { DatabaseModule } from 'src/database/database.module';

import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/student.resolver';

import { CoursesService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Resolvers
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    //Services
    CoursesService,
    EnrollmentService,
    StudentsService,
  ],
})
export class HttpModule {}
