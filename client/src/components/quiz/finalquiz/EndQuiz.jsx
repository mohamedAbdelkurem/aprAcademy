import { useDispatch, useSelector } from "react-redux";
import { get_top_users } from "../../../redux/users";
import { Link ,Redirect} from "react-router-dom";
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
var duration = require("dayjs/plugin/duration");
dayjs.locale("ar");
dayjs.extend(relativeTime);
dayjs.extend(duration);
const EndQuiz = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { users, loadingUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_top_users());
  }, [dispatch]);
  if (loading) return <Loader />;
  if(!loading && user &&  !user.finishedAt) return <Redirect to="/" />
  return (
    <Container textAlign="center">
      <Card centered fluid>
        <Card.Header as="h3" textAlign="center" style={{ padding: 10 }}>
          لقد أكملت كل الدروس و الاختبارات بنجاح في مدة قدرها
          <Divider />
          <Label color="violet " size="huge">
            {dayjs(user.finishedAt).from(dayjs(user.createdAt), true)}
          </Label>
          <br />
          <Icon color="red" name="birthday cake" />
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
                  style={{ width: 100 }}
                >
                  {u.firstname + " " + u.lastname}
                </Label>
                <Label
                  style={{ width: 100 }}
                  color={u.username === user.username ? "violet" : "grey"}
                  pointing="right"
                >
                  {dayjs(u.finishedAt).from(dayjs(u.createdAt), true)}
                </Label>
              </List.Item>
            ))}
          </div>
        )}
      </List>
      <Button color="facebook" fluid as={Link} to="/courses">
        العودة
      </Button>
    </Container>
  );
};

export default EndQuiz