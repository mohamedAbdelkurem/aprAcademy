import React from "react";
import { useSelector } from "react-redux";
import { Card, List, Icon, Loader, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
function Profile() {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <Loader size="huge" />;
  return (
    <Card centered style={{ padding: 10 }}>
      <Card.Header as="h2">معلومات حسابي</Card.Header>
      <List bulleted divided relaxed celled>
        <List.Item
          icon={<Icon name="users" color="yellow" />}
          content={user.firstname}
          header={"الاسم"}
        />
        <List.Item
          icon={<Icon name="users" color="yellow" />}
          content={user.lastname}
          header={"اللقب"}
        />
        <List.Item
          icon={<Icon name="users" color="yellow" />}
          content={user.username}
          header={"اسم المستخدم"}
        />
        <List.Item
          icon={<Icon name="mail" color="yellow" />}
          content={user.email}
          header={"البريد الإلكتروني"}
        />
        <List.Item
          icon={<Icon name="level up" color="yellow" />}
          content={user.level}
          header={"المستوى"}
        />
        <List.Item
          icon={<Icon name="adn" color="yellow" />}
          content={
            user.type === "الأول" ? "التوجيه المباشر" : "التعليقات التوضيحية"
          }
          header={"النمط"}
        />
        <List.Item>
          <List.Header>
            {" "}
            <Icon name="graduation" color="yellow" />
            الشهادة
          </List.Header>
          <div>
            {user.certificates && user.certificates.length > 0
              ? "تحصلت عليها"
              : "لم تتحصل عليها بعد"}
            {user.certificates && user.certificates.length > 0 && (
              <>
                <Icon name="arrow circle left" color="yellow" />
                <Button
                  as={Link}
                  to={`/certificate/${user.certificates[0].id}`}
                >
                  معاينة
                  <Icon name="graduation" color="yellow" />
                </Button>
              </>
            )}
          </div>
        </List.Item>
      </List>
    </Card>
  );
}

export default Profile;
