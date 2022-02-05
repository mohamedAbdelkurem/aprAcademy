//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import "./App.css";
import { MediaContextProvider } from "./utilities/Artsy";
import "semantic-ui-less/semantic.less";
import "./App.css";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//
import Navbar from "./shared/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

//
// ─── CUSTOM ROUTES ──────────────────────────────────────────────────────────────
//

import RouteUser from "./routes/RouterUser";
import RouteGuest from "./routes/RouteGuest";
import RouteAdmin from "./routes/RouteAdmin";
import RouteAll from "./routes/RouteAll";

import Landing from "./components/Landing";
import Lesson from "./components/Lesson/Lesson";
import Courses from "./components/course/Courses";
// import CourseAdd from "./components/admin/CourseAdd";
// import LessonAdd from "./components/admin/LessonAdd";
// import LessonaAdd from "./components/admin/lessonaAdd";
// import IntroductionAdd from "./components/admin/IntroductionAdd";
// import AdminCourse from "./components/admin/Course";
// import AdminActivity from "./components/admin/Activities";
// import AdminLesson from "./components/admin/Lesson";
// import AdminLessona from "./components/admin/Lessona";
// import AdminVideo from "./components/admin/Videos";
// import AdminIntroduction from "./components/admin/Introductions";
// import ActivityAdd from "./components/admin/ActivityAdd";
// import VideoAdd from "./components/admin/VideoAdd";
// import lessonEdit from "./components/admin/LessonEdit";
import AdminUser from "./components/admin/User";
import AdminMessages from "./shared/Contactus/getMessages";
import AdminMessage from "./shared/Contactus/Edit";
import Main from "./dashboard/Main";

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { get_user_progress, loadUser } from "./redux/auth";
import Layout from "./dashboard/Layout";

import Course from "./components/course/Course";
import CourseA from "./componentsA/course/Course";
import Video from "./components/course/Video";
import Introduction from "./components/course/Introductions";
import QuizChooseOne from "./components/quiz/QuizChooseOne";
import Activity from "./components/course/Activity";

//Type A
import CoursesA from "./componentsA/course/Courses";
import LessonA from "./componentsA/lesson/Lesson";
import QuizVarious from "./components/quiz/finalquiz/QuizVarious";
import { Message } from "semantic-ui-react";
import Profile from "./shared/Profile";
import Certificate from "./shared/Certificate";
import { Container } from "semantic-ui-react";

import Goals from "./static pages/Goals";
import DataMaster from "./static pages/DataMaster";
import Help from "./static pages/help";
import ContactUs from "./shared/Contactus/ContactUs";
import EndQuiz from "./components/quiz/finalquiz/EndQuiz";
import Questions from "./shared/questions/Questions";
import Question from "./shared/questions/Question";
import QuestionAdd from "./shared/questions/QuestionAdd";
import Teachers from "./components/admin/Teachers";
import { checkuser } from "./redux/quiz";
import Dalil from "./static pages/Dalil";
import TopUsers from "./components/admin/TopUsers";
function App() {
  const dispatch = useDispatch();
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(loadUser());
    dispatch(get_user_progress());
    dispatch(checkuser());
  }, [dispatch]);
  const { user, loading } = useSelector((state) => state.auth);
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Router>
      <MediaContextProvider>
        <Navbar>
          {!loading &&
            user &&
            user.graduated &&
            user.certificates &&
            user.certificates.length === 0 &&
            (user.role !== "admin" || user.role !== "teacher") && (
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Message
                  compact
                  info
                  header="لقد أكملت كل المستويات بنجاح ، سيتم منحك شهادة قريبا"
                />
              </Container>
            )}
          <Switch>
            {/* NORMAL ROUTES */}
            <Route
              path="/certificate/:certificateId"
              component={Certificate}
              exact
            />
            {/* GUEST ROUTES */}
            <RouteGuest path="/" component={Landing} exact />
            <RouteGuest path="/login" component={Login} exact />
            <RouteGuest path="/register" component={Register} exact />

            {/* USER ROUTES */}
            <RouteUser
              path="/courses"
              component={user && user.type === "الثاني" ? Courses : CoursesA}
              exact
            />
            <RouteUser path="/profile" component={Profile} exact />
            <RouteUser path="/la/:courseId/:order" component={LessonA} exact />
            <RouteUser
              path="/courses/:courseId"
              component={user && user.type === "الثاني" ? Course : CourseA}
              exact
            />
            <RouteUser path="/l/:courseId/:lessonId" component={Lesson} exact />
            <RouteUser path="/v/:courseId/:videoId" component={Video} exact />
            <RouteUser
              path="/a/:courseId/:activityId"
              component={Activity}
              exact
            />
            <RouteUser path="/i/:courseId" component={Introduction} exact />
            <RouteUser path="/quiz" component={QuizChooseOne} exact />
            <RouteUser path="/finalquiz" component={QuizVarious} exact />
            <RouteUser path="/endquiz" component={EndQuiz} exact />

            <RouteAll path="/questions" component={Questions} exact />
            <RouteAll
              path="/questions/:questionId"
              component={Question}
              exact
            />
            <RouteAll path="/question/add" component={QuestionAdd} exact />

            {/* STATIC PAGES ROUTES */}
            <Route path="/goals" component={Goals} exact />
            <Route path="/help" component={Help} exact />
            <Route path="/contactus" component={ContactUs} exact />
            <Route path="/infos" component={DataMaster} exact />
            <Route path="/guide" component={Dalil} exact />

            {/* ADMIN ROUTES */}
            <Layout>
              <RouteAdmin path="/admin" component={Main} exact />
              {/* <RouteUser path="/admin/courses" component={AdminCourse} exact />
              <RouteUser path="/admin/lessons" component={AdminLesson} exact />
              <RouteUser
                path="/admin/lessonsa"
                component={AdminLessona}
                exact
              />
              <RouteUser
                path="/admin/activities"
                component={AdminActivity}
                exact
              />
              <RouteUser
                path="/admin/introductions"
                component={AdminIntroduction}
                exact
              />
              <RouteUser path="/admin/videos" component={AdminVideo} exact /> */}
              <RouteAdmin path="/admin/users" component={AdminUser} exact />
              <RouteAdmin path="/admin/topusers" component={TopUsers} exact />
              <RouteAdmin
                path="/admin/messages"
                component={AdminMessages}
                exact
              />
              <RouteAdmin
                path="/admin/message/:id"
                component={AdminMessage}
                exact
              />
                <RouteAdmin
                path="/admin/teachers"
                component={Teachers}
                exact
              />
              {/* <RouteUser
                path="/admin/courses/add"
                component={CourseAdd}
                exact
              />
              <RouteUser
                path="/admin/lessons/add"
                component={LessonAdd}
                exact
              />
              <RouteUser
                path="/admin/lessonsa/add"
                component={LessonaAdd}
                exact
              />
              <RouteUser
                path="/admin/lessons/edit/:id"
                component={lessonEdit}
                exact
              />
              <RouteUser
                path="/admin/activity/add"
                component={ActivityAdd}
                exact
              />
              <RouteUser path="/admin/video/add" component={VideoAdd} exact />
              <RouteUser
                path="/admin/introduction/add"
                component={IntroductionAdd}
                exact
              /> */}
            </Layout>
          </Switch>
        </Navbar>
      </MediaContextProvider>
    </Router>
  );
}

export default App;
