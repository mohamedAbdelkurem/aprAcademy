import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_question, reset } from "../../redux/questions";
import {
  Form,
  Segment,
  Message,
  Button,
  Loader,
  Header,
  Card,
} from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function QuestionAdd() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { posted, posting } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  if (posting) return <Loader />;
  if (posted)
    return (
      <Card centered>
        <Message success>تم إضافة السؤال بنجاح</Message>
        <Button as={Link} to="/questions">
          العودة
        </Button>
      </Card>
    );
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Segment padded="very" basic style={{ maxWidth: 700, width: "100%" }}>
        <Header>إضافة سؤال</Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(create_question({ title, body }));
          }}
        >
          <Form.Input
            placeholder="العنوان"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.TextArea
            required
            placeholder="السؤال"
            body={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button primary loading={posting}>
            إضافة
          </Button>
        </Form>
        <Button as={Link} to="/questions">
          العودة
        </Button>
      </Segment>
    </div>
  );
}

export default QuestionAdd;
