import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {
  Loader,
  Segment,
  Container,
  Header,
  Form,
  Comment,
  Button,
  Message,
  Divider,
  Input,
  Label,
  Icon,
} from "semantic-ui-react";
import {
  create_comment_q,
  delete_comment_q,
  get_comments_q,
} from "../../redux/comment";
import { delete_question, get_question, reset } from "../../redux/questions";
import NotFound from "../Page404";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";

dayjs.locale("ar");
dayjs.extend(relativeTime);

function Question() {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const { loading, comments } = useSelector((state) => state.comments);
  const { question, loadingQuestion, deleted } = useSelector(
    (state) => state.questions
  );
  const { user } = useSelector((state) => state.auth);
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(get_question(questionId));
    dispatch(get_comments_q(questionId));
    dispatch(reset());
  }, [dispatch, questionId]);

  if (loadingQuestion || loading) return <Loader />;
  if (deleted) return <Redirect to="/questions" />;
  return (
    <div>
      <Container>
        <Segment>
          <Header>{question.title}</Header>
          <Label color="orange">
            <Icon name="pencil" /> {question.user.username}
          </Label>
          <Label color="teal">
            <Icon name="clock" />
            {dayjs(question.createdAt).format("YYYY-MM-DD على الساعة DD:HH")}
          </Label>
          <Label color="green">{question.user.level}</Label>
        </Segment>

        <Segment>{question.body}</Segment>
        <Button as={Link} to="/questions" compact size="small">
          <Icon name="arrow right" />
          العودة
        </Button>
        {question.user.email === user.email && (
          <Button
            size="small"
            compact
            color="red"
            onClick={() => {
              dispatch(delete_question(question.id));
            }}
          >
            <Icon name="trash" />
            حذف السؤال
          </Button>
        )}
        {(user.role === "admin" || user.role === "teacher") && (
          <Button
            size="small"
            compact
            color="red"
            onClick={() => {
              dispatch(delete_question(question.id));
            }}
          >
            <Icon name="trash" />
            حذف السؤال
          </Button>
        )}
        <Segment>
          <Comment.Group>
            <Header as="h3" dividing>
              التعليقات
            </Header>

            {loading ? (
              <Loader />
            ) : (
              <>
                {!comments || comments.length === 0 ? (
                  <Message info header="كن أول من يعلق" />
                ) : (
                  comments.map((comment) => (
                    <Comment>
                      <Comment.Content>
                        <Comment.Author as="a">
                          {comment.user.username}
                        </Comment.Author>
                        <Comment.Metadata>
                          {dayjs(comment.createdAt).fromNow()}
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        {user.username === comment.user.username && (
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() => {
                                dispatch(
                                  delete_comment_q({
                                    id: comment.id,
                                    questionId,
                                  })
                                );
                              }}
                            >
                              حذف
                            </Comment.Action>
                          </Comment.Actions>
                        )}
                      </Comment.Content>
                      <Divider />
                    </Comment>
                  ))
                )}

                <Form>
                  <Form.TextArea
                    style={{
                      color: "red",
                      border: "1px solid gray",
                      borderRadius: "3",
                    }}
                    required
                    label="إضافة تعليق"
                    control={Input}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <Button
                    content="أضف"
                    labelPosition="right"
                    icon="edit"
                    primary
                    onClick={() => {
                      setBody("");
                      dispatch(create_comment_q({ body, questionId }));
                    }}
                  />
                </Form>
              </>
            )}
          </Comment.Group>
        </Segment>
      </Container>
    </div>
  );
}

export default Question;
