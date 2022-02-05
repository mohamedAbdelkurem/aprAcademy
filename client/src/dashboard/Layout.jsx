import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Divider, Loader, Button } from "semantic-ui-react";

const Layout = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <Loader />;
  if (!user || (user && user.role !== "admin")) return <Redirect to="/" />;
  return (
    <Container>
      <Button as={Link} to="/admin/users">
        الأعضاء
      </Button>
      <Button as={Link} to="/admin/topusers">
        قائمة المتفوقين
      </Button>
      <Button as={Link} to="/admin/messages">
        الرسائل
      </Button>
      <Button as={Link} to="/admin/teachers">
        هيئة التدريس
      </Button>
      <Divider />
      <Container>{children}</Container>
    </Container>
  );
};

export default Layout;
