import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_activity, get_all_activities } from "../../redux/activities";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Activity = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_activities());
  }, [dispatch]);
  const { activities, deleting } = useSelector((state) => state.activities);
  return (
    <>
      <Button as={Link} to="/admin/activity/add">
        إضافة نشاط
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
          {activities.map((activity) => (
            <Table.Row key={activity.id}>
              <Table.Cell>{activity.title}</Table.Cell>
              <Table.Cell>{activity.course.title}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(delete_activity(activity.id));
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

export default Activity;
