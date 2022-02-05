import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  Button,
  Container,
  Input,
  Label,
  Header,
  Form,
  Radio,
  TextArea,
} from "semantic-ui-react";
import { create_lessona, reset } from "../../redux/lessonsa";
import { get_courses } from "../../redux/courses";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const mdParser = new MarkdownIt(/* Markdown-it options */);
function LessonaAdd() {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    color: "",
    body: "",
    quiz: "",
    quizType: "",
    courseId: "",
    order:0,
    embededFile: "",
  });
  const [lessonQuiz, setLessonQuiz] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_courses());
    dispatch(reset());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(create_lessona(formValues));
  };
  const handleEditorChange = ({ html, text }) => {
    setFormValues({ ...formValues, body: JSON.stringify(text) });
  };
  const handleOptionsChange = (e) => {
    setFormValues({ ...formValues, courseId: e.target.value });
  };
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const { posted } = useSelector((state) => state.lessonsa);
  const { courses } = useSelector((state) => state.courses);
  return (
    <Container>
      <Form>
        <Form.Field>
          <Radio
            label={"درس"}
            name="radioGroup"
            checked={lessonQuiz}
            onChange={() => setLessonQuiz(true)}
          />
          <Radio
            label={"اختبار"}
            name="radioGroup"
            checked={!lessonQuiz}
            onChange={() => setLessonQuiz(false)}
          />
        </Form.Field>
      </Form>
      {!posted ? (
        <form
          dir="rtl"
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Input
            placeholder="العنوان"
            name="title"
            onChange={handleChange}
            label="العنوان"
          />
           <Input
            placeholder="الترتيب"
            name="order"
            onChange={handleChange}
            label="الترتيب"
            type="number"
          />
          <Input
            placeholder="اللون"
            name="color"
            onChange={handleChange}
            label="اللون"
          />
          <Input
            placeholder="Embeded File"
            name="embededFile"
            onChange={handleChange}
            label="Embeded File"
          />
          <Label>
            الكورس
            <select
              style={{
                padding: 10,
                borderColor: "lightgray",
                fontFamily: "Cairo",
                display: "inline-block",
                width: "400px",
                margin: 3,
              }}
              name="courseId"
              value={formValues.courseId}
              onChange={handleOptionsChange}
            >
              <option name="courseId" value={"f"}>
                اختر
              </option>
              {courses.map((course) => (
                <option name="courseId" value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </Label>
          <Input
            placeholder="الوصف"
            name="description"
            onChange={handleChange}
            label="الوصف"
          />
          <>
            <Label>المحتوى</Label>
            <MdEditor
              dir="rtl"
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </>
          {!lessonQuiz && (
            <>
              <Input
                placeholder="نوع السؤال"
                name="quizType"
                onChange={handleChange}
                label="نوع السؤال"
              />
              <TextArea
                label="الأسئلة"
                dir="ltr"
                name="quiz"
                onChange={handleChange}
                rows={20}
              />
            </>
          )}
          <Button onClick={(e) => handleSubmit(e)}>إضافة</Button>
        </form>
      ) : (
        <>
          <Header>تم إضافة الدرس بنجاح</Header>
          <Button as={Link} to="/admin/lessonsa">
            العودة
          </Button>
        </>
      )}
    </Container>
  );
}

export default LessonaAdd;
