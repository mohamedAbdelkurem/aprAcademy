import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_lesson, get_all_lessons } from "../../redux/lessons";
import { Link } from "react-router-dom";

const Lesson = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_lessons());
  }, [dispatch]);
  const { lessons, deleting } = useSelector((state) => state.lessons);
  return (  
    <>
      <Button as={Link} to="/admin/lessons/add">
        إضافة درس
      </Button>
      <Table fixed textAlign="right">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>العنوان</Table.HeaderCell>
            <Table.HeaderCell>الكورس</Table.HeaderCell>
            <Table.HeaderCell>العمليات</Table.HeaderCell>
            <Table.HeaderCell>النوع</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {lessons.map((lesson) => (
            <Table.Row key={lesson.id}>
              <Table.Cell>
                <Link to={`/admin/lessons/edit/${lesson.id}`}>
                  {lesson.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{lesson.course.title}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(delete_lesson(lesson.id));
                  }}
                  loading={deleting}
                >
                  حذف
                </Button>
                <Button
                  color="green"
                  as={Link}
                  to={`/l/${lesson.course.id}/${lesson.id}`}
                >
                  معاينة
                </Button>
              </Table.Cell>
              <Table.Cell>{lesson.quiz? "اختبار":"درس"}</Table.Cell>

            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Lesson;
