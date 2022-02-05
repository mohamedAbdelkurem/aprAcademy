import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Card, Loader,Button,Label } from "semantic-ui-react";

import { getmessages } from "../../redux/message";
import { deleteMessage } from "../../redux/message";

export default function Messages() {
  const params = useParams();

  const dispatch = useDispatch();
  //const { errors, loading } = useSelector((state) => state.articles);
  const messages = useSelector((state) => state.messages);
  useEffect(() => {
    dispatch(getmessages());
  }, []);
  return (
    <div>
      {messages.loading ? (
        <Loader />
      ) : (
        messages.messages.map((item) => (
          <div key={item.id} style={{ padding: "20px" }}>
            <Card fluid>
              <Card.Content>
                <Card.Header style={{ color: "green" }}>
                  {item.messageTitle}
                </Card.Header>
                <Card.Meta style={{ color: "black" }}>
                  {" "}
                  {dayjs(item.createdAt).format("YYYY-MM-DD على الساعة DD:HH")}
                </Card.Meta>
              </Card.Content>
              <Card.Content>{item.message}</Card.Content>
           
            </Card>
            <Link to={`/admin/messages`}>
                <Button  primary>العودة</Button>
              </Link>
          </div>
        ))
      )}
    </div>
  );
}
