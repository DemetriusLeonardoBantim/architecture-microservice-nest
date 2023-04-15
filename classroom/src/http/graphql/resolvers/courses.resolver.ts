import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course } from '../models/course';
import { CoursesService } from 'src/services/courses.service';
import { CreateCourseInput } from '../inputs/craete-course-input';
import { CurrentUser } from 'src/http/auth/current-user';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentService } from 'src/services/enrollment.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: any) {
    const student = await this.studentsService.getStudentByAuthUser(
      user.req.auth.sub,
    );

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCoursesById(id);
  }

  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
