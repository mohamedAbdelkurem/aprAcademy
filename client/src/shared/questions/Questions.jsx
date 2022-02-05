import React, { useEffect } from "react";
import { Card, Container, Segment, Button, Loader } from "semantic-ui-react";

import { get_all_questions, get_my_questions, reset } from "../../redux/questions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
dayjs.locale("ar");
dayjs.extend(relativeTime);
function Questions() {
  const { questions, loadingQuestions } = useSelector(
    (state) => state.questions
  );
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_questions());
    dispatch(reset());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Segment
        loading={loadingQuestions}
        padded="very"
        basic
        style={{ maxWidth: 700, width: "100%" }}
      >
        {!loading && user && user.role === "user" && (
          <>
            <Button color="green" as={Link} to="/question/add">
              طلب مساعدة
            </Button>
            <Button color="blue" onClick={()=>dispatch(get_my_questions())}>
              أسئلتي
            </Button>
            <Button color="blue" onClick={()=>dispatch(get_all_questions())}>
              كل الأسئلة
            </Button>
          </>
        )}
        {questions.length === 0 ? (
          <Card style={{ padding: 10 }} centered fluid>
            <Card.Header>لا توجد أي أسئلة</Card.Header>
          </Card>
        ) : (
          <>
            {questions.map((question) => (
              <Card style={{ padding: 10 }} centered fluid>
                <Card.Meta style={{ marginBottom: 5 }}>
                  بواسطة :{" "}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {question.user.username}
                  </span>{" "}
                  {dayjs(question.createdAt).fromNow()}
                </Card.Meta>

                <Card.Header
                  as={Link}
                  to={`/questions/${question.id}`}
                  textAlign="right"
                  style={{ fontWeight: "bold" }}
                >
                  {question.title}
                </Card.Header>
              </Card>
            ))}
          </>
        )}
      </Segment>
    </div>
  );
}

export default Questions;
