import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delete_lessona, get_all_lessonsa } from "../../redux/lessonsa";

const Lessona = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_lessonsa());
  }, [dispatch]);
  const { lessonsa, deleting } = useSelector((state) => state.lessonsa);
  return (
    <>
      <Button as={Link} to="/admin/lessonsa/add">
        إضافة درس
      </Button>
      <Table fixed textAlign="right" celled compact sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>الترتيب</Table.HeaderCell>
            <Table.HeaderCell>العنوان</Table.HeaderCell>
            <Table.HeaderCell>الكورس</Table.HeaderCell>
            <Table.HeaderCell>العمليات</Table.HeaderCell>
            <Table.HeaderCell>النوع</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {lessonsa.map((lesson) => (
            <Table.Row key={lesson.id}>
              <Table.Cell>{lesson.order}</Table.Cell>
              <Table.Cell>{lesson.title}</Table.Cell>
              <Table.Cell>{lesson.course.title}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(delete_lessona(lesson.id));
                  }}
                  loading={deleting}
                >
                  حذف
                </Button>
                <Button
                  color="green"
                  as={Link}
                  to={`/la/${lesson.course.id}/${lesson.id}`}
                >
                  معاينة
                </Button>
              </Table.Cell>
              <Table.Cell>{lesson.quiz ? "اختبار" : "درس"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Lessona;
