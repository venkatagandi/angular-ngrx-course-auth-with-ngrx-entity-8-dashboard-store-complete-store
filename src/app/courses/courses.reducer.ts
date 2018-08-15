import { Course } from "./model/course";
import { Lesson } from "./model/lesson";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CourseActions, CourseActionTypes } from "./courses.actions";

// export interface CoursesState {
//   coursesEntities: { [key: number]: Course };
//   coursesOrder: number[];
// }

// export interface LessonsState {
//   lessonsEntities: { [key: number]: Lesson };
//   lessonsOrder: number[];
// }

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(
  state = initialCoursesState,
  action: CourseActions
): CoursesState {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded: {
      return adapter.addOne(action.payload.course, state);
    }
    case CourseActionTypes.AllCoursesLoaded: {
      return adapter.addAll(action.payload.courses, {
        ...state,
        allCoursesLoaded: true
      });
    }
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
