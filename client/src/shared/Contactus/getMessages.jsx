// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import dayjs from "dayjs";
import { Card, Icon, Label, Header, Loader, Message } from "semantic-ui-react";

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────

import { getmessages } from "../../redux/message";
import { deleteMessage } from "../../redux/message";

function Messages() {
  const params = useParams();

  const dispatch = useDispatch();
  //const { errors, loading } = useSelector((state) => state.articles);
  const messages = useSelector((state) => state.messages);
  useEffect(() => {
    dispatch(getmessages());
  }, [dispatch]);

  if (messages.loading) return <Loader />;

  return (
    <div>
      <Header textAlign="center">الرسائل</Header>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {messages.messages && messages.messages.length === 0 ? (
          <Card centered>
            <Message header="لاتوجد أي رسائل" success icon="check" />
          </Card>
        ) : (
          messages.messages.map((item) => (
            <div key={item.id} style={{ padding: "5px" }}>
              <Card>
                <Card.Content>
                  <Card.Header>{item.messageTitle}</Card.Header>{" "}
                  <Card.Meta style={{ color: "black" }}>
                    {dayjs(item.createdAt).format(
                      "YYYY-MM-DD على الساعة DD:HH"
                    )}
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <p>الاسم: {item.firstname} </p>
                  <p> البريد الإلكتروني : {item.email}</p>
                  <button
                    style={{
                      color: "red",
                      borderRadius: "2px",
                      fontSize: "15px",
                      backgroundColor: "white",
                      border: "none",
                      padding: "15px 32px",
                      textDecoration: "none",
                      display: "inline-block",
                      margin: "4px 2px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(deleteMessage({ id: item.id }));
                    }}
                  >
                    <Icon name="trash" />
                  </button>
                  <Link to={`/admin/message/${item.id}`}>
                    <Label color="green">
                      <Icon name="arrow left" color="white" />
                    </Label>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Messages;
