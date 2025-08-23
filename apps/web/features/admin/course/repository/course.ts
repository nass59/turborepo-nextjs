import { findOneById } from '@/lib/database/queries';

import Course, { type CourseModel } from './model';

export function findOneCourse(courseId: string): Promise<CourseModel | null> {
  return findOneById(Course, courseId);
}
