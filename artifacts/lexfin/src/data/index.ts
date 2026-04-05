import { Course } from "./types";
import { course1 } from "./course1";
import { course2 } from "./course2";

export const COURSES: Record<string, Course> = {
  [course1.id]: { ...course1, brochureUrl: "/api/content/Course1/Lexfin module 1 brochure.pdf" },
  [course2.id]: { ...course2, brochureUrl: "/api/content/Course2/Lexfin module  2 brochure.pdf" },
};

export const getCourseById = (id: string): Course | undefined => {
  return COURSES[id];
};

export const getAllCourses = (): Course[] => {
  return Object.values(COURSES);
};
