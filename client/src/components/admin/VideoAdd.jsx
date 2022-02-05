import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-markdown-editor-lite/lib/index.css";
import { Button, Container, Input, Label, Header } from "semantic-ui-react";
import { get_courses } from "../../redux/courses";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { create_video, reset } from "../../redux/videos";
function VideoAdd() {
  const [formValues, setFormValues] = useState({
    title: "",
    courseId: "",
    link: "",
    duration: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_courses());
    dispatch(reset());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(create_video(formValues));
  };
  const handleOptionsChange = (e) => {
    setFormValues({ ...formValues, courseId: e.target.value });
  };
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const { posted } = useSelector((state) => state.videos);
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
          <Input
            placeholder="الرابط"
            name="link"
            onChange={handleChange}
            label="الرابط"
          />
          <Input
            placeholder="المدة"
            name="duration"
            onChange={handleChange}
            label="المدة"
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
          <Button onClick={(e) => handleSubmit(e)}>إضافة</Button>
        </form>
      ) : (
        <>
          <Header>تم إضافة الفيديو بنجاح</Header>
          <Button as={Link} to="/admin/videos">
            العودة
          </Button>
        </>
      )}
    </Container>
  );
}

export default VideoAdd;
