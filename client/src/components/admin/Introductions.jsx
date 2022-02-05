import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_introduction, get_all_introductions } from "../../redux/introductions";
import { Link } from "react-router-dom";

const Introduction = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_introductions());
  }, [dispatch]);
  const { introductions, deleting } = useSelector((state) => state.introductions);
  return (
    <>
      <Button as={Link} to="/admin/introduction/add">
        إضافة تمهيد
      </Button>
      <Table fixed textAlign="right">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>العنوان</Table.HeaderCell>
            <Table.HeaderCell>الكورس</Table.HeaderCell>
            <Table.HeaderCell>العمليات</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {introductions.map((introduction) => (
            <Table.Row key={introduction.id}>
              <Table.Cell>{introduction.title}</Table.Cell>
              <Table.Cell>{introduction.course.title}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(delete_introduction(introduction.id));
                  }}
                  loading={deleting}
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

export default Introduction;
