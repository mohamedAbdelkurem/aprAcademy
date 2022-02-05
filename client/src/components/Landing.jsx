//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React from "react";
import { Link } from "react-router-dom";
//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//
import { Button, Grid, Header, Image,Container } from "semantic-ui-react";

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

function Landing() {
  console.log(process.env);
  // ────────────────────────────────────────────────────────────────────────────────
  return (
    <div
    style={{ backgroundColor: "#F0BF4C", height: "100vh" }}>
      <Grid container columns="equal" verticalAlign="middle">
        <Grid.Row
          columns="2"
          centered
          verticalAlign="middle"
          
        >
          <Grid.Column style={{ padding: 10 }} mobile="16"  largeScreen="8">
            <Header
              dir="rtl"
              textAlign="right"
              as="h3"
              style={{ fontSize: "1.5rem", padding: 10 }}
            >
              مرحباُ بكم في بيئتنا للتعلم التكيفي و سنقوم برحلة لتنمية بعض
              مهارات البرمجة بمجال تكنولوجيا المعلومات والاتصالات لطالبات
              المرحلة الثانوية
            </Header>
            <Button color="google plus" as={Link} to="/register">
              أنشئ حساب جديد
            </Button>
            <Button as={Link} to="/login">
              الدخول
            </Button>
          </Grid.Column>

          <Grid.Column
            verticalAlign="middle"
            style={{ paddingBottom: "5em", paddingTop: "5em" }}
          >
            <Image size="large"  src="./notebook.png" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Landing;
