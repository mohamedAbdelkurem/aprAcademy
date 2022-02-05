import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Divider,
  Label,
  Icon,
  Loader,
  List,
  Button,
} from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { useEffect } from "react";
import { get_top_users_all } from "../../redux/users";
var duration = require("dayjs/plugin/duration");
dayjs.locale("ar");
dayjs.extend(relativeTime);
dayjs.extend(duration);

function TopUsers() {
  const dispatch = useDispatch();
  const { users, loadingUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(get_top_users_all());
  }, [dispatch]);
  return (
    <div>
      <Container textAlign="center">
        <Card centered fluid>
          <Card.Header as="h3" textAlign="center" style={{ padding: 10 }}>
           قائمة المتفوين
            <Divider />
          </Card.Header>
        </Card>
        <List divided celled relaxed style={{ direction: "rtl" }}>
          {loadingUsers ? (
            <Loader />
          ) : (
            <div style={{ padding: 10 }}>
              <Label color="black">قائمة المتفوقين</Label>
              {users.map((u, index) => (
                <List.Item style={{ padding: 10 }}>
                  <Label
                    color={
                      index === 0
                        ? "red"
                        : index === 1
                        ? "green"
                        : index === 2
                        ? "blue"
                        : "black"
                    }
                  >
                    {index + 1}
                  </Label>
                  <Label
                    color={
                      index === 0
                        ? "red"
                        : index === 1
                        ? "green"
                        : index === 2
                        ? "blue"
                        : "black"
                    }
                    style={{ width: 300 }}
                  >
                    {u.firstname + " " + u.lastname}
                  </Label>
                  <Label style={{ width: 100 }} color={"grey"} pointing="right">
                    {dayjs(u.finishedAt).from(dayjs(u.createdAt), true)}
                  </Label>
                </List.Item>
              ))}
            </div>
          )}
        </List>
      </Container>
    </div>
  );
}

export default TopUsers;
