import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Container,
  Header,
  Grid,
  Card,
  Icon,
  Loader,
  Accordion
} from "semantic-ui-react";
import { create_result_la } from "../../redux/results";
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  replaceLink: function (link) {
    return link.substring(6);
  },
}).use(require("markdown-it-replace-link"));

function QuizSort({ quiz, body, lessonaId }) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [submited, setSubmited] = useState(false);
  const { submitting } = useSelector((state) => state.results);
  const { loadingProgress } = useSelector((state) => state.auth);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [activePanel, setActivePanel] = useState(false);

  useEffect(() => {
    setAnswers(JSON.parse(quiz).answers);
    setCorrectOrder(JSON.parse(quiz).correctOrder);
  }, [dispatch, quiz]);
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
    dispatch(
      create_result_la({
        score: (points / answers.length) * 100,
        passed: true,
        lessonaId,
      })
    );
  };
  if (submitting || loadingProgress) return <Loader active size="huge" />;
  if (submited)
    return (
      <div>
        <Card centered color="black" style={{ padding: 4 }}>
          <Card.Header as="h5">
            {score === 100 ? (
              <Header color="green">لقد تجاوزت هذا الإختبار بنجاح</Header>
            ) : (
              <Header color="red">لديك فرصة أخرى</Header>
            )}
          </Card.Header>
        </Card>
        <Accordion>
          <Accordion.Title
            active={activePanel}
            onClick={() => setActivePanel(!activePanel)}
          >
            <Header textAlign="center">
              الملاحظات
              <Icon name={activePanel ? "close" : "angle down"} />
            </Header>
          </Accordion.Title>
          <Accordion.Content active={activePanel}>
            <Card centered>
              <Card.Header style={{ padding: 5 }} as="h4">
                {" "}
                إجابتك
              </Card.Header>
              {/* {answers.map((answer, index) => (
            <p style={{ paddingRight: 5 }}>
              {" "}
              {index + 1} - {answer.name}<p> ---</p> 
            </p>
          ))} */}
              {/* <Card.Header style={{ padding: 5 }} as="h4">
            {" "}
            الإجابة الصحيحة
          </Card.Header> */}
              {JSON.parse(quiz).correctOrder.map((order, index) => (
                <p style={{ paddingRight: 5 }}>
                  {index + 1} - {answers[index].name}{" "}
                  {JSON.parse(quiz).answers[order - 1].name ===
                  answers[index].name ? (
                    <p>
                      <Icon color="green" name="check" /> صحيحة
                    </p>
                  ) : (
                    <p>
                      <Icon color="red" name="close" /> خاطئة
                    </p>
                  )}
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
          </Accordion.Content>
        </Accordion>
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
      <div
        dangerouslySetInnerHTML={{
          __html: md.render(JSON.parse(body)),
        }}
      ></div>
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

export default QuizSort;
