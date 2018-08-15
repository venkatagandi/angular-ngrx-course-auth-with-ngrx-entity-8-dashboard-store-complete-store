import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  CourseActionTypes,
  CourseRequested,
  CourseLoaded,
  AllCoursesLoaded
} from "./courses.actions";
import { mergeMap, map, withLatestFrom, filter } from "rxjs/operators";
import { CoursesService } from "./services/courses.service";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { allCoursesLoaded } from "./course.selectors";

@Injectable()
export class CourseEffects {
  @Effect()
  loadCourse$ = this.action$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested),
    mergeMap(action =>
      this.coursesService.findCourseById(action.payload.courseId)
    ),
    map(course => new CourseLoaded({ course }))
  );

  // @Effect()
  // loadAllCourses$ = this.action$.pipe(
  //   ofType<CourseRequested>(CourseActionTypes.AllCoursesRequested),
  //   mergeMap(action => this.coursesService.findAllCourses()),
  //   map(courses => new AllCoursesLoaded({ courses }))
  // );

  @Effect()
  loadAllCourses$ = this.action$.pipe(
    ofType<CourseRequested>(CourseActionTypes.AllCoursesRequested),
    withLatestFrom(this.store.select(allCoursesLoaded)),
    filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
    mergeMap(action => this.coursesService.findAllCourses()),
    map(courses => new AllCoursesLoaded({ courses }))
  );

  constructor(
    private action$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState> //check this later
  ) {}
}
