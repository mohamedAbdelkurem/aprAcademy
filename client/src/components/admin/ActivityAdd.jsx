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
} from "semantic-ui-react";
import { reset } from "../../redux/activities";
import { get_courses } from "../../redux/courses";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { create_activity } from "../../redux/activities";
const mdParser = new MarkdownIt(/* Markdown-it options */);
function ActivityAdd() {
  const [formValues, setFormValues] = useState({
    title: "",
    courseId: "",
    body: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_courses());
    dispatch(reset());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(create_activity(formValues));
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
  const { posted } = useSelector((state) => state.activities);
  const { courses } = useSelector((state) => state.courses);
  return (
    <Container>
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

          <Label>المحتوى</Label>
          <MdEditor
            dir="rtl"
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
          <Button onClick={(e) => handleSubmit(e)}>إضافة</Button>
        </form>
      ) : (
        <>
          <Header>تم إضافة النشاط بنجاح</Header>
          <Button as={Link} to="/admin/activities">
            العودة
          </Button>
        </>
      )}
    </Container>
  );
}

export default ActivityAdd;
