//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Container,
  Grid,
  Header,
  Icon,
  Tab,
  Button,
  Card,
  Message,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import ResponsiveEmbed from "react-responsive-embed";
import { getLessonsa, get_lessona } from "../../redux/lessonsa";
import { create_result_la, reset_submited } from "../../redux/results";
import QuizSort from "../quiz/QuizSort";
import QuizChooseOne from "../quiz/QuizChooseOne";
import Comments from "./Comments";
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  replaceLink: function (link, env) {
    return link.substring(6);
  },
}).use(require("markdown-it-replace-link"));

function Lesson() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { loadingLessona, loadingLessonsa, lessona, lessonsa } = useSelector(
    (state) => state.lessonsa
  );
  const { loadingProgress, progress } = useSelector((state) => state.auth);
  const { submited, submitting } = useSelector((state) => state.results);
  const { courseId, order } = useParams();
  useEffect(() => {
    dispatch(get_lessona({ courseId, order }));
    dispatch(getLessonsa(courseId));
    dispatch(reset_submited());
    window.scrollTo(0, 0);
  }, [dispatch, order, courseId, submited]);

  if (submited)
    return (
      <div>
        <Card centered>
          {!loadingLessonsa && lessona && lessona.quiz ? (
            <Message icon="check" success header="لقد أكملت هذا الإختبار" />
          ) : (
            <Message icon="check" success header="لقد أكملت هذا الدرس" />
          )}

          {!loadingLessonsa && lessonsa[lessonsa.length - 1].order > order && (
            <>
              {!loadingProgress && progress > Number(order) ? (
                <>
                  <Button
                    primary
                    as={Link}
                    to={`/la/${courseId}/${Number(order) + 1}`}
                  >
                    التالي
                  </Button>
                </>
              ) : (
                <>
                  <Button disabled icon="lock" labelPosition="right">
                    <Icon name="lock" />
                    التالي
                  </Button>
                </>
              )}
            </>
          )}

          <Button onClick={() => history.push(`/courses/${courseId}`)}>
            العودة
          </Button>
        </Card>
      </div>
    );
  return (
    <Container>
      {/*──────────────────────────────────────────────────────────────────────────────Header*/}
      <Header as="h2" block color="blue">
        <Header.Content>
          {!loadingLessona && lessona && (
            <>
              {lessona.order}- {lessona.title}
            </>
          )}
        </Header.Content>
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
              lessona && lessona.quiz
                ? {
                    menuItem: "الاختبار",
                    render: () => (
                      <Tab.Pane attached={false} loading={loadingLessona}>
                        {lessona.quizType === "QuizChooseOne" ? (
                          <>
                            {!loadingProgress &&
                            Number(lessona.order) === progress ? (
                              <QuizChooseOne
                                quiz={lessona.quiz}
                                lessonaId={lessona.id}
                              />
                            ) : (
                              <Message
                                icon="check"
                                header="لقد أكملت هذا الإختبار"
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {!loadingProgress &&
                            Number(lessona.order) === progress ? (
                              <QuizSort
                                quiz={lessona.quiz}
                                body={lessona.body}
                                lessonaId={lessona.id}
                              />
                            ) : (
                              <Message
                                icon="check"
                                header="لقد أكملت هذا الإختبار"
                              />
                            )}
                          </>
                        )}
                      </Tab.Pane>
                    ),
                  }
                : {
                    menuItem: lessona && lessona.quiz ? "الإختبار" : "الدرس",
                    render: () => (
                      <Tab.Pane attached={false}>
                        {lessona && lessona.embededFile && (
                          <ResponsiveEmbed
                            src={lessona.embededFile}
                            allowfullscreen
                          />
                        )}
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              lessona &&
                              lessona.body &&
                              md.render(JSON.parse(lessona.body)),
                          }}
                        ></div>
                      </Tab.Pane>
                    ),
                  },
            ]}
          />

          {lessona && !lessona.quiz && (
            <Card centered>
              {lessona && !loadingProgress && progress === Number(order) ? (
                <Button
                  icon="lock"
                  labelPosition="right"
                  color="linkedin"
                  loading={submitting}
                  onClick={() =>
                    dispatch(
                      create_result_la({
                        score: 100,
                        passed: true,
                        lessonaId: lessona.id,
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%  ",
              margin: 10,
            }}
          >
            {!loadingLessonsa && lessonsa[0].order < order ? (
              <Button
                primary
                as={Link}
                to={`/la/${courseId}/${Number(order) - 1}`}
              >
                السابق
              </Button>
            ) : (
              <Button disabled>السابق</Button>
            )}
            <>
              {!loadingLessonsa && lessonsa[lessonsa.length - 1].order > order && (
                <>
                  {!loadingProgress && progress > Number(order) ? (
                    <Button
                      primary
                      as={Link}
                      to={`/la/${courseId}/${Number(order) + 1}`}
                    >
                      التالي
                    </Button>
                  ) : (
                    <>
                      <Button disabled icon="lock" labelPosition="right">
                        <Icon name="lock" />
                        التالي
                      </Button>
                    </>
                  )}
                </>
              )}
              <Button
                icon="arrow left"
                labelPosition="right"
                as={Link}
                to={`/courses/${courseId}`}
              >
                <Icon name="arrow left" />
                العودة
              </Button>
            </>
          </div>
          {/*────────────────────────────────────────────────────────────────────────────Tabs*/}
        </Grid.Column>
      </Grid>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Comments order={order} />
      </div>
    </Container>
  );
}

export default Lesson;
