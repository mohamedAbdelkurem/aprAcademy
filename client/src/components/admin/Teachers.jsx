import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Loader,
  Confirm,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, get_teachers } from "../../redux/users";
import { update_role_normal} from "../../redux/auth";

const Teachers = () => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    dispatch(get_teachers());
  }, [dispatch]);
  const { users, loadingUsers } = useSelector((state) => state.users);
  if (loadingUsers) return <Loader />;
  return (
    <div>
      <Table dir="rtl" compact basic celled>
        <Table.Header style={{ textAlign: "right" }}>
          <Table.Row>
            <Table.HeaderCell>اسم المستخدم</Table.HeaderCell>
            <Table.HeaderCell>الاسم</Table.HeaderCell>
            <Table.HeaderCell>اللقب</Table.HeaderCell>
            <Table.HeaderCell>البريد الإلكتروني</Table.HeaderCell>

            <Table.HeaderCell>العمليات</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body style={{ textAlign: "right" }}>
          {users &&
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.firstname}</Table.Cell>
                <Table.Cell>{user.lastname}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>

                <Table.Cell>
                  <Button
                    size="mini"
                    color="red"
                    onClick={() => {
                      setDeleteUserId(user.id);
                      setDeleteModal(true);
                    }}
                  >
                    حذف
                  </Button>
                  <Button
                    size="mini"
                    color="blue"
                    onClick={() => {
                      dispatch(update_role_normal(user.id));
                    }}
                  >
                    طالب
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
     
      <Confirm
        centered
        cancelButton="إلغاء"
        confirmButton="حذف"
        content=""
        closeIcon
        header={
          <center style={{ padding: 10, fontWeight: "bold", fontSize: 20 }}>
            هل أنت متأكد
          </center>
        }
        open={deleteModal}
        onCancel={() => {
          setDeleteModal(false);
          setDeleteUserId(null);
        }}
        onConfirm={() => {
          dispatch(delete_user(deleteUserId));
          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Teachers;
