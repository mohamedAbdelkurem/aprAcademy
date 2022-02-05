import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Button, Container, Input, Label, Header } from "semantic-ui-react";
import { get_lesson, reset, update_lesson } from "../../redux/lessons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
const mdParser = new MarkdownIt(/* Markdown-it options */);
function LessonEdit() {
  const params = useParams();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    color: "",
    body: "",
  });
  const { lesson, loadingLesson, posted } = useSelector(
    (state) => state.lessons
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_lesson(params.id));
    dispatch(reset());
  }, [dispatch,params.id]);
  useEffect(() => {
    setFormValues(lesson);
  }, [lesson]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update_lesson({ ...formValues, lessonId: params.id }));
  };
  const handleEditorChange = ({ html, text }) => {
    setFormValues({ ...formValues, body: JSON.stringify(text) });
  };
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  if (loadingLesson) {
    return <p>wait</p>;
  }
  if (posted) {
    return (
      <>
        <Header>تم تعديل الدرس بنجاح</Header>
        <Button as={Link} to="/admin/lessons">
          العودة
        </Button>
      </>
    );
  }
  return (
    <Container>
      <form
        dir="rtl"
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Input
          placeholder="العنوان"
          name="title"
          onChange={handleChange}
          label="العنوان"
          value={formValues && formValues.title}
        />
        <Input
          placeholder="اللون"
          name="color"
          onChange={handleChange}
          label="اللون"
          value={formValues && formValues.color}
        />
        <Input
          placeholder="الوصف"
          name="description"
          onChange={handleChange}
          label="الوصف"
          value={formValues && formValues.description}
        />
        <Label>المحتوى</Label>
        <MdEditor
          dir="rtl"
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={JSON.parse(formValues && formValues.body)}
        />
        <Button onClick={(e) => handleSubmit(e)}>حفظ</Button>
      </form>
    </Container>
  );
}

export default LessonEdit;
