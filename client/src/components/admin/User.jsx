import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Icon,
  Form,
  Input,
  Loader,
  Label,
  Confirm,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, get_users } from "../../redux/users";
import { update_role_teacher, update_user_grade } from "../../redux/auth";
import { create_certificate } from "../../redux/certificate";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const User = () => {
  const dispatch = useDispatch();
  const [gradeModal, setGradeModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [grade, setGrade] = useState(0);
  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);
  const { users,userCount, loadingUsers,finishedCount,notFinishedCount } = useSelector((state) => state.users);
  if (loadingUsers) return <Loader />;
  return (
    <div>
      <Label>عدد الأعضاء {users && userCount}</Label>
      <Label>عدد الأعضاء الذين أكملوا الإختبار {users && finishedCount}</Label>
      <Label>عدد الأعضاء الذين لم يكملوا الإختبار {users && notFinishedCount}</Label>
      <Table dir="rtl" compact basic celled>
        <Table.Header style={{ textAlign: "right" }}>
          <Table.Row>
            <Table.HeaderCell>اسم المستخدم</Table.HeaderCell>
            <Table.HeaderCell>الاسم</Table.HeaderCell>
            <Table.HeaderCell>اللقب</Table.HeaderCell>
            <Table.HeaderCell>البريد الإلكتروني</Table.HeaderCell>
            <Table.HeaderCell>التقدم</Table.HeaderCell>
            <Table.HeaderCell>المستوى</Table.HeaderCell>
            <Table.HeaderCell>النمط</Table.HeaderCell>
            <Table.HeaderCell>النقطة العملية</Table.HeaderCell>
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
                  {user.graduated ? (
                    <Label color="green">منتهي</Label>
                  ) : (
                    <Label color="red">مستمر</Label>
                  )}
                </Table.Cell>
                <Table.Cell>{user.level ? <p>{user.level}</p>:"لم يحدد بعد"}</Table.Cell>
                <Table.Cell>
                  {user.type === "الأول"
                    ? "التوجيه المباشر"
                    : user.type === "الثاني"
                    ? "التعليقات التوضيحية"
                    :"لم يحدد بعد"}
                </Table.Cell>
                <Table.Cell>
                  {user.grade ? (
                    <p>{user.grade}</p>
                  ) : (
                    <Button
                      onClick={() => {
                        setUserId(user.id);
                        setGradeModal(true);
                      }}
                    >
                      <Icon name="add" />
                    </Button>
                  )}
                </Table.Cell>
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
                      dispatch(update_role_teacher(user.id))
                    }}
                  >
                    هيئة تدريس
                  </Button>
                  {user.certificates && user.certificates.length > 0 ? (
                    <Button
                      size="mini"
                      color="green"
                      disabled={!user.grade && !user.graduated}
                      as={Link}
                      to={`/certificate/${user.certificates[0].id}`}
                    >
                      معاينة شهادة
                    </Button>
                  ) : (
                    <Button
                      size="mini"
                      color="blue"
                      disabled={!user.grade || !user.graduated}
                      onClick={() => dispatch(create_certificate(user.id))}
                    >
                      تقديم شهادة
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Modal
        centered
        dir="rtl"
        open={gradeModal}
        closeOnDimmerClick
        closeOnEscape
        closeIcon
        onClose={() => {
          setUserId(null);
          setGradeModal(false);
        }}
      >
        <Modal.Header>إضافة نقطة</Modal.Header>
        <Modal.Content>
          <Form>
            <input type="number"  max="10" min="1"  onChange={(e) => setGrade(e.target.value)} />
            <Button
              onClick={() => dispatch(update_user_grade({ grade, userId }))}
            >
              حفظ
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
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

export default User;
