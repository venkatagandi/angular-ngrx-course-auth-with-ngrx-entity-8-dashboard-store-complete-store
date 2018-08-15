import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { filter, map, tap, withLatestFrom } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import {
  selectAllCourses,
  selectBeginnerCourses,
  selectAdvancedCourses,
  selectPromoTotal
} from "../course.selectors";
import { AllCoursesRequested } from "../courses.actions";
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  //   constructor(
  //     private coursesService: CoursesService,
  //     private store: Store<AppState>
  //   ) {}

  constructor(
    //private coursesService: CoursesService
    //,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // const courses$ = this.coursesService.findAllCourses();

    this.store.dispatch(new AllCoursesRequested());
    // const courses$ = this.store.pipe(select(selectAllCourses));

    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

    // courses$.pipe(
    //   map(courses => courses.filter(course => course.category === "BEGINNER"))
    // );

    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    // courses$.pipe(
    //   map(courses => courses.filter(course => course.category === "ADVANCED"))
    // );

    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    // courses$.pipe(
    //   map(courses => courses.filter(course => course.promo).length)
    // );
  }
}
