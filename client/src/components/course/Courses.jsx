//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import { get_user_progress } from "../../redux/auth";
import { get_courses_match } from "../../redux/courses";
import { checkuser } from "../../redux/quiz";

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const { checkingUser, userQuizProgress } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_courses_match());
    window.scrollTo(0, 0);
  }, [dispatch]);
  return (
    <div style={{ height: "100vh" }}>
      <Card centered raised style={{ padding: 10 }}>
        <Card.Header as="h3" textAlign="center">
          المستويات
        </Card.Header>
      </Card>
      {courses.courses.map((course, index) => (
        <Card
          centered
          color={"teal"}
          header={index + 1 + "-" + course.description}
          as={Link}
          to={`/courses/${course.id}`}
        />
      ))}
      {user && !user.graduated ? (
        <>
          {!checkingUser &&
          userQuizProgress.lessonsCount === userQuizProgress.results ? (
            <Card
              centered
              color={"red"}
              header="الإختبار النهائي"
              as={Link}
              to="/finalquiz"
            />
          ) : (
            <Card
              centered
              color={"black"}
              as="h3"
              header={() => (
                <>
                  <Icon name="lock" />
                  الإختبار النهائي
                </>
              )}
            />
          )}
        </>
      ) : (
        <Card
        centered
        color={"red"}
        header="النتائج و المتفوقين"
        as={Link}
        to="/endquiz"
      />
      )}
    </div>
  );
}

export default Courses;
