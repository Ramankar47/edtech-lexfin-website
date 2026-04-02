import { Course } from "./types";
import { course1 } from "./course1";
import { course2 } from "./course2";

export const COURSES: Record<string, Course> = {
  [course1.id]: course1,
  [course2.id]: course2,
};

export const getCourseById = (id: string): Course | undefined => {
  return COURSES[id];
};

export const getAllCourses = (): Course[] => {
  return Object.values(COURSES);
};
