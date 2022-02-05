import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { Button, Container, Header, Grid, Card } from "semantic-ui-react";


function Sort() {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [correctOrder, setCorrectOrder] = useState([]);
  const quiz = useSelector((state) => state.quiz.quiz4);
  useEffect(() => {
    setAnswers(JSON.parse(quiz).answers);
    setCorrectOrder(JSON.parse(quiz).correctOrder);
  }, [dispatch,quiz]);
  const handleSort = () => {
    // console.log(answers);
  };
  const processResult = (e) => {
    e.preventDefault();
    let points = 0;
    answers.forEach((answer, index) => {
      if (answer.id === correctOrder[index]) points++;
    });
    setScore((points / answers.length) * 100);
    setSubmited(true);
  };

  if (submited)
    return (
      <div>
        <Card centered color="red" style={{ padding: 4 }}>
          <Card.Header as="h5">
            <Header>
              عدد النقاط:{" "}
              <span style={{ color: "red" }}>{score.toFixed(2)}</span>{" "}
            </Header>
          </Card.Header>
        </Card>
        <Card centered color="green" style={{ padding: 4 }}>
          <Card.Header as="h5">
            {score === 100 ? (
              <Header color="green">لقد تجاوزت هذا الإختبار بنجاح</Header>
            ) : (
              <Header color="red">لديك فرصة أخرى</Header>
            )}
          </Card.Header>
        </Card>
        <Card centered>
          <Card.Header style={{ padding: 5 }} as="h4">
            إجابتك
          </Card.Header>
          {answers.map((answer, index) => (
            <p style={{ paddingRight: 5 }}>
              {" "}
              {index + 1} - {answer.name}
            </p>
          ))}
          <Card.Header style={{ padding: 5 }} as="h4">
            {" "}
            الإجابة الصحيحة
          </Card.Header>
          {correctOrder.map((order, index) => (
            <p style={{ paddingRight: 5 }}>
              {index + 1} - {answers[order - 1].name}
            </p>
          ))}
          <Button
            onClick={() => {
              setSubmited(false);
            }}
          >
            العودة
          </Button>
        </Card>
      </div>
    );
  if (!started) {
    return (
      <Card centered>
        <Button
          onClick={() => setStarted(true)}
          animated
          icon="heart"
          color="google plus"
        >
          إبدأ الإختبار
        </Button>
      </Card>
    );
  }
  return (
    <Container>
      <div>
        <p>{quiz.body}</p>
      </div>
      <Header>الإجابة</Header>
      <Grid centered padded stretched>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {answers.map((item, index) => (
            <Button
              animated={false}
              color="blue"
              disabled
              key={item.id}
              style={{ textAlign: "right" }}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <ReactSortable
          list={answers}
          onChange={handleSort}
          setList={setAnswers}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {answers.map((item) => (
            <Button key={item.id} style={{ textAlign: "right" }}>
              {item.name}
            </Button>
          ))}
        </ReactSortable>
      </Grid>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Button primary onClick={(e) => processResult(e)}>
          إرسال
        </Button>
      </div>
    </Container>
  );
}

export default Sort;
