import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_course, get_courses } from "../../redux/courses";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Lessons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_courses());
  }, [dispatch]);
  const { courses,loadingCourses,deleting} = useSelector((state) => state.courses);
  return (
    <>
      <Button as={Link} to="/admin/courses/add">
        إضافة كورس
      </Button>

      <Table padded compact="very" sortable dir="rtl" textAlign="right">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>التعريف</Table.HeaderCell>
            <Table.HeaderCell>العنوان</Table.HeaderCell>
            <Table.HeaderCell>الوصف</Table.HeaderCell>
            <Table.HeaderCell>النمط</Table.HeaderCell>
            <Table.HeaderCell>المستوى</Table.HeaderCell>
            <Table.HeaderCell>العمليات</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!loadingCourses && courses.map((course) => (
            <Table.Row key={course.id}>
              <Table.Cell>{course.id}</Table.Cell>
              <Table.Cell>{course.title}</Table.Cell>
              <Table.Cell>{course.description}</Table.Cell>
              <Table.Cell>{course.type}</Table.Cell>
              <Table.Cell>{course.level}</Table.Cell>
              <Table.Cell>
                <Button
                  loading={deleting}
                  color="red"
                  onClick={() => dispatch(delete_course({ id: course.id }))}
                >
                  حذف
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Lessons;
