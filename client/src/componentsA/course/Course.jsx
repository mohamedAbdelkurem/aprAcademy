import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Icon, Loader, Progress, Button } from "semantic-ui-react";
import { get_course } from "../../redux/courses";
import { checkuser } from "../../redux/quiz";

function Course() {
  const dispatch = useDispatch();
  const { course, loadingCourse } = useSelector((state) => state.courses);

  const { user, loadingProgress, loading } = useSelector((state) => state.auth);
  const { userQuizProgress } = useSelector((state) => state.quiz);
  const { location } = useHistory();
  console.log(user);
  const params = useParams();
  useEffect(() => {
    dispatch(checkuser());
    dispatch(get_course(params.courseId));
  }, [dispatch, params.courseId, location.pathname, userQuizProgress.results]);
  if (loading || loadingCourse || loadingProgress)
    return <Loader active indeterminate />;
  return (
    <div style={{ margin: 10 }}>
      {user && !loading && (
        <Card
          color="black"
          centered
          style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
        >
          <Card.Header as="h3">{course.title}</Card.Header>
          <Progress
            size="medium"
            precision
            active
            autoSuccess
            percent={(
              (100 *
                course.lessons.filter(
                  (lesson) => lesson.order <= userQuizProgress.results
                ).length) /
              course.lessons.length
            ).toFixed(2)}
            indicating
          ></Progress>
        </Card>
      )}

      {user &&
        !loading &&
        course.lessons.map((lesson) => (
          <Card
            color={
              userQuizProgress.results+1 < lesson.order
                ? "black"
                : lesson.color
            }
            centered
            style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
          >
            {userQuizProgress.results+1 < lesson.order ? (
              <>
                <Card.Header as="h4" style={{ padding: 10 }} textAlign="right">
                  <Icon name="lock" color="grey" /> {lesson.title}
                </Card.Header>
              </>
            ) : (
              <>
                <Link to={`/la/${course.id}/${lesson.order}`}>
                  <Card.Header
                    as="h4"
                    style={{ padding: 10 }}
                    textAlign="right"
                  >
                    <Icon name="circle" color={lesson.color} /> {lesson.title}
                    {lesson.order < userQuizProgress.results+1 && (
                      <Icon name="check" color="green" />
                    )}
                  </Card.Header>
                </Link>
              </>
            )}
          </Card>
        ))}
      <Card
        centered
        style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
      >
        <Card.Header as="h4" style={{ padding: 10 }} textAlign="right">
          <Button as={Link} to="/courses" icon="back" fluid>
            العودة
          </Button>
        </Card.Header>
      </Card>
    </div>
  );
}

export default Course;
// ت د أ خ ب ح ث  ج
