import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Select,
} from "semantic-ui-react";
import { create_course, reset } from "../../redux/courses";

const types = [
  { key: "m", text: "الأول", value: "الأول" },
  { key: "f", text: "الثاني", value: "الثاني" },
];
const levels = [
  { key: "m", text: "مبتدئ", value: "مبتدئ" },
  { key: "f", text: "خبير", value: "خبير" },
];
function CourseAdd() {
  const dispatch = useDispatch();
  const { posting } = useSelector((state) => state.courses);
  const [formValues, setFormValues] = useState({
    title: "",
    type: "",
    level: "",
    description: "",
  });
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
    console.log(name, value);
  };
  const handleSubmit = () => {
    dispatch(create_course(formValues));
  };
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  const {posted} = useSelector(state => state.courses)
  return (
    <Grid
      padded
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      textAlign="center"
    >
      <Grid.Column>
        {posted ? (
          <>
          <Header>تم إضافة الكورس بنجاح</Header>
          <Button as={Link} to="/admin/courses">العودة</Button>
          </>
        ) : (
          <>
            <Icon size="huge" name="add" />
            <Header as="h2" color={"black"} textAlign="center">
              إضافة كورس
            </Header>
            <Form onSubmit={handleSubmit} loading={posting}>
                <Form.Field
                  name="title"
                  control={Input}
                  onChange={handleChange}
                  label="العنوان"
                  placeholder="العنوان"
                />
                <br />
                <Form.Field
                  name="description"
                  control={Input}
                  onChange={handleChange}
                  label="الوصف"
                  placeholder="الوصف"
                />
                <br />
                <Form.Field
                  name="type"
                  control={Select}
                  label="النمط"
                  options={types}
                  placeholder="النمط"
                  onChange={handleChange}
                />
                <br />

                <Form.Field
                  name="level"
                  control={Select}
                  label="المستوي"
                  options={levels}
                  placeholder="المستوي"
                  onChange={handleChange}
                />
              <Form.Field control={Button}>إضافة</Form.Field>
            </Form>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default CourseAdd;
