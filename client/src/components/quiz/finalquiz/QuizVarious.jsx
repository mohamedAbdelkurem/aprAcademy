import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Label,
  Container,
  Card,
  Button,
  Grid,
  Header,
  Message,
  Divider,
  Icon,
  Accordion,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import {
  checkuser,
  setQuiz1Result,
  setQuiz2Result,
  setQuiz3Result,
  setQuiz4Result,
  setQurrentQuiz,
} from "../../../redux/quiz";
import { graduate } from "../../../redux/results";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { get_top_users } from "../../../redux/users";
var duration = require("dayjs/plugin/duration");
dayjs.locale("ar");
dayjs.extend(relativeTime);
dayjs.extend(duration);
function QuizVarious() {
  const { currentQuiz } = useSelector((state) => state.quiz);
  const { user, loading } = useSelector((state) => state.auth);
  const { checkingUser, userQuizProgress } = useSelector((state) => state.quiz);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkuser());
    dispatch(setQurrentQuiz(4));
  }, [dispatch]);

  if (loading || checkingUser) return <Loader />;
  if (
    !checkingUser &&
    userQuizProgress.lessonsCount !== userQuizProgress.results
  ) {
    return <Redirect to="/" />;
  }
  if (user && user.graduated) return <Redirect to="/endquiz" />;
  return (
    <Container style={{ marginTop: 10, marginBottom: 10 }}>
      <Card centered fluid>
        {currentQuiz === 0 ? (
          <Card centered fluid style={{ padding: 10 }} raised>
            <Card.Header as="h2" textAlign="center">
              الإختبار الأخير
            </Card.Header>
            <Card.Meta textAlign="center" style={{ margin: 10 }}>
              يتكون هذا الإختبار من أربع تمارينات
            </Card.Meta>
            <Button
              color="google plus"
              onClick={() => dispatch(setQurrentQuiz(1))}
            >
              إبدأ الإختبار
            </Button>
          </Card>
        ) : currentQuiz === 1 ? (
          <Quiz1 />
        ) : currentQuiz === 2 ? (
          <Quiz2 />
        ) : currentQuiz === 3 ? (
          <Quiz3 />
        ) : (
          currentQuiz === 4 && <Quiz4 />
        )}
      </Card>
    </Container>
  );
}

const Quiz1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [answerPicked, setAnswerPicked] = useState(undefined);
  const questions = useSelector((state) => state.quiz.quiz1);
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(false);
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
      console.log("score :", score);
      console.log("questions.length :", questions.length);
      setFinished(true);
    }
  };
  const handleNext = () => {
    dispatch(setQurrentQuiz(2));
    dispatch(setQuiz1Result((score * 100) / questions.length));
  };
  if (finished)
    return (
      <Container style={{ marginTop: 10 }}>
        <Card centered color="green" style={{ padding: 4 }}>
          <Card.Content as="h5">
            {score === questions.length ? (
              <>
                <Message
                  icon="check"
                  success
                  header=" لقد أكملت التمرين الأول بنجاح"
                />
                <Button color="facebook" onClick={handleNext} fluid>
                  انتقل للتمرين الثاني
                </Button>
              </>
            ) : (
              <>
                <Message
                  icon="x"
                  error
                  header="لديك فرصة أخرى"
                />

                <Button color="facebook" fluid as={Link} to="/courses">
                  العودة
                </Button>
              </>
            )}
          </Card.Content>
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
            {userAnswers.map((answer) => (
              <Card centered style={{ padding: 4 }} color="blue">
                <Card.Header as="h5">
                  <Header>{questions[answer.questionIndex].question}</Header>
                </Card.Header>
                {questions[answer.questionIndex].answers[
                  questions[answer.questionIndex].correctAnswerIndex
                ] ===
                questions[answer.questionIndex].answers[answer.answerPicked] ? (
                  <p>
                    <Icon name="check" color="green" /> إجابة صحيحة
                  </p>
                ) : (
                  <p>
                    <Icon name="close" color="red" /> إجابة خاطئة
                  </p>
                )}
              </Card>
            ))}
          </Accordion.Content>
        </Accordion>
      </Container>
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
};

const Quiz2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [answerPicked, setAnswerPicked] = useState(undefined);
  const questions = useSelector((state) => state.quiz.quiz2);
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(false);
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
      console.log("score :", score);
      console.log("questions.length :", questions.length);
      setFinished(true);
    }
  };
  const handleNext = () => {
    dispatch(setQurrentQuiz(3));
    dispatch(setQuiz2Result((score * 100) / questions.length));
  };
  if (finished)
    return (
      <Container style={{ marginTop: 10 }}>
        <Card centered color="green" style={{ padding: 4 }}>
          <Card.Content as="h5">
            {score === questions.length ? (
              <>
                <Message
                  icon="check"
                  success
                  header=" لقد أكملت التمرين الثاني بنجاح"
                />
                <Button color="facebook" onClick={handleNext} fluid>
                  انتقل للتمرين الثالث
                </Button>
              </>
            ) : (
              <>
                <Message
                  icon="x"
                  error
                  header="لديك فرصة أخرى"
                />

                <Button color="facebook" fluid as={Link} to="/courses">
                  العودة
                </Button>
              </>
            )}
          </Card.Content>
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
            {userAnswers.map((answer) => (
              <Card centered style={{ padding: 4 }} color="blue">
                <Card.Header as="h5">
                  <Header>{questions[answer.questionIndex].question}</Header>
                </Card.Header>
                {questions[answer.questionIndex].answers[
                  questions[answer.questionIndex].correctAnswerIndex
                ] ===
                questions[answer.questionIndex].answers[answer.answerPicked] ? (
                  <p>
                    <Icon name="check" color="green" /> إجابة صحيحة
                  </p>
                ) : (
                  <p>
                    <Icon name="close" color="red" /> إجابة خاطئة
                  </p>
                )}
              </Card>
            ))}
          </Accordion.Content>
        </Accordion>
      </Container>
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
};

const Quiz3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [answerPicked, setAnswerPicked] = useState(undefined);
  const questions = useSelector((state) => state.quiz.quiz3);
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(false);
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
      console.log("score :", score);
      console.log("questions.length :", questions.length);
      setFinished(true);
    }
  };
  const handleNext = () => {
    dispatch(setQurrentQuiz(4));
    dispatch(setQuiz3Result((score * 100) / questions.length));
  };
  if (finished)
    return (
      <Container style={{ marginTop: 10, marginBottom: 10 }}>
        <Card centered color="green" style={{ padding: 4 }}>
          <Card.Content as="h5">
            {score === questions.length ? (
              <>
                <Message
                  icon="check"
                  success
                  header=" لقد أكملت التمرين الثالث بنجاح"
                />
                <Button color="facebook" onClick={handleNext} fluid>
                  انتقل للتمرين الرابع
                </Button>
              </>
            ) : (
              <>
                <Message
                  icon="x"
                  error
                  header="لديك فرصة أخرى"
                />

                <Button color="facebook" fluid as={Link} to="/courses">
                  العودة
                </Button>
              </>
            )}
          </Card.Content>
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
            {userAnswers.map((answer) => (
              <Card centered style={{ padding: 4 }} color="blue">
                <Card.Header as="h5">
                  <Header>{questions[answer.questionIndex].question}</Header>
                </Card.Header>
                {questions[answer.questionIndex].answers[
                  questions[answer.questionIndex].correctAnswerIndex
                ] ===
                questions[answer.questionIndex].answers[answer.answerPicked] ? (
                  <p>
                    <Icon name="check" color="green" /> إجابة صحيحة
                  </p>
                ) : (
                  <p>
                    <Icon name="close" color="red" /> إجابة خاطئة
                  </p>
                )}
              </Card>
            ))}
          </Accordion.Content>
        </Accordion>
      </Container>
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Button
                  primary={answerPicked === index}
                  onClick={() => setAnswerPicked(index)}
                  style={{ margin: 10 }}
                >
                  {index + 1}الصورة
                </Button>
                <img
                  style={{ width: "100%", maxWidth: 500, textAlign: "center" }}
                  src={`/quiz_final/${ans}.png`}
                  alt="pic"
                />
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
};

const Quiz4 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [answerPicked, setAnswerPicked] = useState(undefined);
  const questions = useSelector((state) => state.quiz.quiz4);
  const { submited, submitting } = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(false);
  const [saved, setSaved] = useState(false);
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
      console.log("score :", score);
      console.log("questions.length :", questions.length);
      setFinished(true);
    }
  };
  const handleNext = () => {
    dispatch(setQuiz4Result((score * 100) / questions.length));
    dispatch(graduate());
  };
  if (submitting) return <Loader />;
  if (finished)
    return (
      <Container style={{ marginTop: 10 }}>
        <Card centered color="green" style={{ padding: 4 }}>
          <Card.Content as="h5">
            {score === questions.length ? (
              <>
                <Message
                  icon="check"
                  success
                  header=" لقد أكملت التمرين الرابع بنجاح"
                />

                <Button color="facebook" onClick={handleNext} fluid>
                  حفظ النتائج
                </Button>
              </>
            ) : (
              <>
                <Message
                  icon="x"
                  error
                  header="لديك فرصة أخرى"
                />

                <Button color="facebook" fluid as={Link} to="/courses">
                  العودة
                </Button>
              </>
            )}
          </Card.Content>
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
            {userAnswers.map((answer) => (
              <Card centered style={{ padding: 4 }} color="blue">
                <Card.Header as="h5">
                  <Header>{questions[answer.questionIndex].question}</Header>
                </Card.Header>
                {questions[answer.questionIndex].answers[
                  questions[answer.questionIndex].correctAnswerIndex
                ] ===
                questions[answer.questionIndex].answers[answer.answerPicked] ? (
                  <p>
                    <Icon name="check" color="green" /> إجابة صحيحة
                  </p>
                ) : (
                  <p>
                    <Icon name="close" color="red" /> إجابة خاطئة
                  </p>
                )}
              </Card>
            ))}
          </Accordion.Content>
        </Accordion>
      </Container>
    );
  return (
    <Container>
      <Grid centered padded>
        <div>
          <Header block color="blue">
            قم بإختيار إجابة واحدة صحيحة
          </Header>
          <br />
          <p>
            <Header inverted block>
              {questions[currentQuestion].question}
            </Header>

            {questions[currentQuestion].answers.map((ans, index) => (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <p
                  style={{
                    margin: 10,
                    textAlign: "right",
                    backgroundColor: answerPicked === index && "lightgray",
                  }}
                >
                  {ans.split("\n").map((a) => (
                    <li>{a}</li>
                  ))}
                </p>
                <Button
                  primary={answerPicked === index}
                  onClick={() => setAnswerPicked(index)}
                  style={{ margin: 10 }}
                >
                  الإجابة {index + 1}
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
            إنهاء
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export default QuizVarious;
