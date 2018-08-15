import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import * as fromCourse from "./courses.reducer";
export const selectCoursesState = createFeatureSelector<CoursesState>(
  "courses"
);

export const selectCourseById = (courseId: number) =>
  createSelector(selectCoursesState, (coursesState: CoursesState) => {
    return coursesState.entities[courseId];
  });

export const selectAllCourses = createSelector(
  selectCoursesState,
  //coursesState => coursesState.ids
  fromCourse.selectAll
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesLoaded
);

export const selectBeginnerCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category == "BEGINNER")
);

export const selectAdvancedCourses = createSelector(selectAllCourses, courses =>
  courses.filter(course => course.category == "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);
