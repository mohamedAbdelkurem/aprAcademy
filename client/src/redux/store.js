import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import lessonsReducer from "./lessons";
import lessonsaReducer from "./lessonsa";
import coursesReducer from "./courses";
import usersReducer from "./users";
import activitiesReducer from "./activities";
import videosReducer from "./videos";
import introductionsReducer from "./introductions";
import resultsReducer from "./results";
import quizReducer from "./quiz";
import commentsReducer from "./comment";
import certificatesReducer from "./certificate";
import messageReducer from "./message";
import questionReducer from "./questions";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonsReducer,
    lessonsa: lessonsaReducer,
    courses: coursesReducer,
    users: usersReducer,
    activities: activitiesReducer,
    videos: videosReducer,
    introductions: introductionsReducer,
    results: resultsReducer,
    quiz: quizReducer,
    comments: commentsReducer,
    certificates: certificatesReducer,
    messages:messageReducer,
    questions:questionReducer
  },
  middleware: [...getDefaultMiddleware()],
});
