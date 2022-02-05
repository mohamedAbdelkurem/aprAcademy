//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Header,
  Icon,
  Tab,
  Card,
  Button,
  Label,
  Message,
} from "semantic-ui-react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Comments from "./Comments";
import { get_lesson, getLessons, create_visit } from "../../redux/lessons";
import { create_result_l } from "../../redux/results";
import { useParams } from "react-router-dom";
import QuizChooseOne from "../quiz/QuizChooseOne";
import QuizSort from "../quiz/QuizSort";
import ResponsiveEmbed from "react-responsive-embed";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  replaceLink: function (link, env) {
    return link.substring(6);
  },
}).use(require("markdown-it-replace-link"));
dayjs.locale("ar");
dayjs.extend(relativeTime);
const LessonsTab = ({ lessons, lessonId, courseId }) => {
  return (
    <Grid padded divided>
      <Grid.Row divided>
        <Grid.Column>
          <Header as="h4" icon="list" content="المحتوى" />
        </Grid.Column>
      </Grid.Row>
      {lessons &&
        lessons.map((lesson) => (
          <Grid.Row
            divided
            style={{
              marginTop: 1,
              backgroundColor:
                lessonId === lesson.id.toString() ? "#8AC1E6" : "white",
            }}
            as={Link}
            to={`/l/${courseId}/${lesson.id}`}
          >
            <Grid.Column
              verticalAlign="middle"
              widescreen={2}
              textAlign="center"
              mobile={2}
              tablet={2}
              largeScreen={1}
            >
              <Icon
                dir="ltr"
                name={lessonId === lesson.id ? "circle" : "square"}
                color={lesson.color}
              />
            </Grid.Column>
            <Grid.Column
              mobile={13}
              tablet={14}
              largeScreen={15}
              widescreen={14}
            >
              <Header size="small" color="black">
                {lesson.title}
                {lesson && lesson.results.length > 0 && (
                  <span style={{ color: "green" }}>
                    <Icon dir="ltr" name={"check"} />
                  </span>
                )}
              </Header>
            </Grid.Column>
          </Grid.Row>
        ))}
    </Grid>
  );
};

function Lesson() {
  const dispatch = useDispatch();
  const { loadingLesson, loadingLessons, lesson, lessons } = useSelector(
    (state) => state.lessons
  );
  const { courseId, lessonId } = useParams();
  const { submitting } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(get_lesson(lessonId));
    dispatch(getLessons(courseId));
    dispatch(create_visit(lessonId));
    window.scrollTo(0, 0);
  }, [dispatch, lessonId, courseId]);
  return (
    <Container>
      {/*  ───────────────────────────────────────────────────────────────────────Breadcrumb */}
      <BreadcrumbComponent
        loading={loadingLesson}
        title={lesson && lesson.title}
        courseTitle={lesson && lesson.course.title}
        courseId={lesson && lesson.course.id}
      />
      {/*──────────────────────────────────────────────────────────────────────────────Header*/}
      <Header as="h2" block color="blue">
        <Header.Content>
          {!loadingLesson && lesson && lesson.title}
        </Header.Content>
        {!loadingLesson && lesson && lesson.visits.length > 0 && (
          <Header as="h5" color="grey" textAlign="right">
            <Label color="gray">
              آخر زيارة
              <Icon name={"arrow left"} color="red" />
              {!loadingLesson &&
                lesson &&
                lesson.visits.length > 0 &&
                dayjs(lesson.visits[0].date).fromNow()}
            </Label>
          </Header>
        )}
      </Header>
      {/* ──────────────────────────────────────────────────────────────────────────────Grid */}
      <Grid stackable>
        {/*  ──────────────────────────────────────────────────────────────────────Left side */}
        <Grid.Column width={16}>
          {/*───────────────────────────────────────────────────────────────────────────Video*/}
          <Tab
            menu={{ secondary: true, pointing: true }}
            renderActiveOnly
            panes={[
              lesson && lesson.quiz
                ? {
                    menuItem: "الاختبار",
                    render: () => (
                      <Tab.Pane attached={false} loading={loadingLesson}>
                        {lesson.quizType === "QuizChooseOne" ? (
                          <>
                            {lesson && lesson.results.length > 0 ? (
                              <Message
                                icon="check"
                                header="لقد أكملت هذا الإختبار"
                                success
                              />
                            ) : (
                              <QuizChooseOne
                                quiz={lesson.quiz}
                                lessonId={lesson.id}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {lesson && lesson.results.length > 0 ? (
                              <Message
                                icon="check"
                                
                                success
                                header="لقد أكملت هذا الإختبار"
                              />
                            ) : (
                              <QuizSort
                                quiz={lesson.quiz}
                                body={lesson.body}
                                lessonId={lesson.id}
                                courseId={courseId}
                              />
                            )}
                          </>
                        )}
                      </Tab.Pane>
                    ),
                  }
                : {
                    menuItem: lesson && lesson.quiz ? "الإختبار" : "الدرس",
                    render: () => (
                      <Tab.Pane attached={false}>
                        {lesson && lesson.embededFile && (
                          <ResponsiveEmbed
                            src={lesson.embededFile}
                            allowfullscreen
                          />
                        )}
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              lesson &&
                              lesson.body &&
                              md.render(JSON.parse(lesson.body)),
                          }}
                        ></div>
                      </Tab.Pane>
                    ),
                  },
            ]}
          />
          {lesson && !lesson.quiz && (
            <Card centered>
              {lesson.results.length === 0 ? (
                <Button
                  icon="lock"
                  labelPosition="right"
                  color="linkedin"
                  loading={submitting}
                  onClick={() =>
                    dispatch(
                      create_result_l({
                        score: 100,
                        passed: true,
                        lessonId: lesson.id,
                        courseId,
                      })
                    )
                  }
                >
                  <Icon name="check" />
                  أكملت الدرس
                </Button>
              ) : (
                <Message icon="check" success header="لقد أكملت هذا الدرس" />
              )}
            </Card>
          )}
          {/*────────────────────────────────────────────────────────────────────────────Tabs*/}
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: "الدروس",
                render: () => (
                  <Tab.Pane attached={false} loading={loadingLessons}>
                    <LessonsTab
                      lessons={lessons}
                      lessonId={lessonId}
                      courseId={courseId}
                    />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "المناقشة",
                render: () => (
                  <Tab.Pane attached={false}>
                    <Comments lessonId={lesson && lesson.id} />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Grid.Column>
      </Grid>
      <Button
        fluid
        style={{ marginTop: 10, marginBottom: 10 }}
        as={Link}
        to={`/courses/${courseId}`}
      >
        العودة
      </Button>
    </Container>
  );
}

export default Lesson;