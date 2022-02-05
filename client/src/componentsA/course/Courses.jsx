//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import { get_courses_match } from "../../redux/courses";
import { checkuser } from "../../redux/quiz";

function CoursesA() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const { checkingUser, userQuizProgress } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(checkuser());
    dispatch(get_courses_match());
  }, [dispatch]);
  return (
    <div style={{ height: "100vh" }}>
      {courses.courses.map((course) => (
        <Card
          centered
          color={"teal"}
          header={course.title}
          meta={course.description}
          as={Link}
          to={`/courses/${course.id}`}
        />
      ))}
      {user && user.graduated && (
        <Card
          centered
          color={"red"}
          header="النتائج و المتفوقين"
          as={Link}
          to="/endquiz"
        />
      )}
      {!checkingUser && user && !user.graduated && (
        <>
          {userQuizProgress.lessonsCount === userQuizProgress.results ? (
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
      )}
    </div>
  );
}

export default CoursesA;
