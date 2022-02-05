import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Icon,
  Loader,
  Modal,
  Progress,
  Header,
  Label,
} from "semantic-ui-react";
import { get_course } from "../../redux/courses";
import Videos from "./Videos";
import Activities from "./Activities";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { checkuser } from "../../redux/quiz";
dayjs.locale("ar");
dayjs.extend(relativeTime);
function Course() {
  const dispatch = useDispatch();
  const { course, loadingCourse } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const { checkingUser, userQuizProgress } = useSelector((state) => state.quiz);
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_course(params.courseId));
  }, [dispatch, params.courseId]);
  if (loadingCourse ||checkingUser) return <Loader active indeterminate />;
  return (
    <div style={{ margin: 10 }}>
      <Card
        color="black"
        centered
        style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
      >
        <Card.Header as="h3">{course.title}</Card.Header>
        <Progress
          size="medium"
          precision
          active
          autoSuccess
          percent={
            (100 * course.lessons.filter((l) => l.results.length > 0).length) /
            course.lessons.length
          }
          indicating
        />
      </Card>

      {course.lessons.map((lesson) => (
        <Card
          color={lesson.color}
          centered
          style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
        >
          <Link to={`/l/${course.id}/${lesson.id}`}>
            <Card.Header as="h4" style={{ padding: 10 }} textAlign="right">
              <Icon name="circle" color={lesson.color} />{" "}
              <span
                style={{
                  color: lesson && lesson.visits.length > 0 && "blueviolet",
                }}
              >
                {lesson.title}
              </span>
              {lesson && lesson.results.length > 0 && (
                <span style={{ color: "green" }}>
                  <Icon dir="ltr" name={"check"} />
                </span>
              )}
            </Card.Header>
          </Link>
          {lesson && lesson.visits.length > 0 && (
            <Header
              as="h5"
              color="grey"
              textAlign="right"
              style={{ margin: 2 }}
            >
              <Label color="gray">
                <Icon name={"arrow left"} color="red" />
                آخر زيارة : {dayjs(lesson.visits[0].date).fromNow()}
              </Label>
            </Header>
          )}
        </Card>
      ))}
      <Card
        centered
        style={{ maxWidth: 500, width: "100%", textAlign: "center" }}
      >
        <Card.Content>
          <Button style={{ margin: 10 }} as={Link} to={`/i/${course.id}/`}>
            التمهيدات
            <Icon name="circle" color="yellow" />
          </Button>
          <Button
            onClick={() => setOpenVideoModal(true)}
            icon="circle"
            style={{ margin: 10 }}
          >
            {user.level === "خبير" ? <> نماذج عملية </> : <> الفيديو</>}{" "}
            <Icon name="circle" color="green" />
          </Button>
          <Button
            icon="circle"
            style={{ margin: 10 }}
            onClick={() => setOpenActivityModal(true)}
          >
            {user.level === "خبير" ? (
              <> موضوعات مشابهة لموضوع التعلم </>
            ) : (
              <> الأنشطة</>
            )}
            <Icon name="circle" color="red" />
          </Button>
        </Card.Content>
        <Button as={Link} to="/courses">
          العودة
        </Button>
        <Modal
          centered
          dir="rtl"
          open={openVideoModal}
          closeOnDimmerClick
          closeOnEscape
          closeIcon
          onClose={() => setOpenVideoModal(false)}
        >
          <Modal.Header></Modal.Header>
          <Modal.Content>
            <Videos />
          </Modal.Content>
        </Modal>
        <Modal
          centered
          dir="rtl"
          open={openActivityModal}
          closeOnDimmerClick
          closeOnEscape
          closeIcon
          onClose={() => setOpenActivityModal(false)}
        >
          <Modal.Header></Modal.Header>
          <Modal.Content>
            <Activities />
          </Modal.Content>
        </Modal>
      </Card>
    </div>
  );
}

export default Course;
