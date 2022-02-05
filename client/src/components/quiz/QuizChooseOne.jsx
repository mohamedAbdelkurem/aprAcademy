import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Container,
  Grid,
  Header,
  Card,
  Icon,
  Loader,
  Accordion
} from "semantic-ui-react";
import { create_result_l } from "../../redux/results";

function QuizChooseOne({ quiz, lessonId }) {
  const [questions, setQuestions] = useState(JSON.parse(quiz));
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const { submitting } = useSelector((state) => state.results);
  const { loadingProgress } = useSelector((state) => state.auth);
  const [answerPicked, setAnswerPicked] = useState(undefined);
  const [activePanel, setActivePanel] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestions(JSON.parse(quiz));
  }, [quiz]);
  const nextQuestion = async () => {
    setUserAnswers([
      ...userAnswers,
      { questionIndex: currentQuestion, answerPicked: answerPicked },
    ]);
    setCurrentQuestion(currentQuestion + 1);
    setAnswerPicked(undefined);
    console.log(answerPicked === questions[currentQuestion].correctAnswerIndex);
    if (answerPicked === questions[currentQuestion].correctAnswerIndex) {
      setScore(score + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      console.log("score :", score);
      console.log("questions.length :", questions.length);
    }
  };
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
  if (finished)
    return (
      <>
        {loadingProgress || submitting ? (
          <Loader />
        ) : (
          <div>
            <Card centered color="green" style={{ padding: 4 }}>
              <Card.Header as="h5">
                {score === questions.length ? (
                  <Header color="green">لقد تجاوزت هذا الإختبار بنجاح</Header>
                ) : (
                  <Header color="red">لديك فرصة أخرى </Header>
                )}
              </Card.Header>
            </Card>
            {score === questions.length ? (
              <Card centered>
                <Button
                  primary
                  onClick={() =>
                    dispatch(
                      create_result_l({
                        score: 100,
                        passed: true,
                        lessonId,
                        courseId: params.courseId,
                      })
                    )
                  }
                >
                  حفظ النتيجة
                </Button>
                <Button as={Link} to={`/courses/${params.courseId}`}>
                  العودة
                </Button>
              </Card>
            ) : (
              <Card centered>
                <Button as={Link} to={`/courses/${params.courseId}`}>
                  العودة
                </Button>
              </Card>
            )}
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
                {userAnswers.map((answer) => (
                  <Card centered style={{ padding: 4 }} color="blue">
                    <Card.Header as="h6">
                      <Header>
                        {questions[answer.questionIndex].question}
                      </Header>
                    </Card.Header>
                    {questions[answer.questionIndex].answers[
                      questions[answer.questionIndex].correctAnswerIndex
                    ] ===
                    questions[answer.questionIndex].answers[
                      answer.answerPicked
                    ] ? (
                      <p>
                        <Icon name="check" color="green" /> إجابة صحيحة
                      </p>
                    ) : (
                      <p>
                        <Icon name="close" color="red" /> إجابة خاطئة
                      </p>
                    )}
                    {/* <p>
                  <span>
                    <strong>الإجابة الصحيحة</strong>
                  </span>
                  <Icon name="angle double left" color="blue" />
                  {
                    questions[answer.questionIndex].answers[
                      questions[answer.questionIndex].correctAnswerIndex
                    ]
                  }
                </p>
                <p>
                  <span>
                    <strong>إجابتك</strong>
                  </span>{" "}
                  <Icon name="angle double left" color="blue" />
                  {questions[answer.questionIndex].answers[answer.answerPicked]}
                </p> */}
                  </Card>
                ))}
              </Accordion.Content>
            </Accordion>
          </div>
        )}
      </>
    );
  return (
    <Container>
      <Grid centered padded>
        <div>
          <Header block color="blue">
            قم بإختيار إجابة واحدة صحيحة
          </Header>
          <br />
          <Header block>السؤال{currentQuestion + 1}</Header>
          <p>
            <Header inverted block>
              {questions[currentQuestion].question}
            </Header>

            {questions[currentQuestion].answers.map((ans, index) => (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Button
                  primary={answerPicked === index}
                  onClick={() => setAnswerPicked(index)}
                  style={{ margin: 10 }}
                >
                  {ans}
                </Button>
              </div>
            ))}
          </p>
          <Button
            primary
            onClick={() => {
              nextQuestion();
            }}
          >
            التالي
          </Button>
        </div>
      </Grid>
    </Container>
  );
}

export default QuizChooseOne;
