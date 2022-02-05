import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Comment,
  Form,
  Header,
  Input,
  Loader,
  Message,
  Divider,
} from "semantic-ui-react";
import {
  create_comment_la,
  delete_comment,
  get_comments_la,
} from "../../redux/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
dayjs.locale("ar");
dayjs.extend(relativeTime);
const Comments = ({ order }) => {
  const dispatch = useDispatch();
  const { loading, comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const [body, setBody] = useState("");
  useEffect(() => {
    dispatch(get_comments_la(order));
  }, [order,dispatch]);
  if (loading) return <Loader />;
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        التعليقات
      </Header>

      {comments.length === 0 ? (
        <Message info header="كن أول من يعلق" />
      ) : (
        comments.map((comment) => (
          <Comment>
            <Comment.Content>
              <Comment.Author as="a">{comment.user.username}</Comment.Author>
              <Comment.Metadata>
                {dayjs(comment.createdAt).fromNow()}
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              {user.username === comment.user.username && (
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => {
                      dispatch(
                        delete_comment({
                          id: comment.id,
                          lessonType: "A",
                          order,
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
          onClick={() => dispatch(create_comment_la({ body, order }))}
        />
      </Form>
    </Comment.Group>
  );
};

export default Comments;
