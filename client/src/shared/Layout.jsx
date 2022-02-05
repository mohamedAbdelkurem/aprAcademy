import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import { MAIN_COLOR } from "../utilities/theme";

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="عن الموقع" color={MAIN_COLOR}/>
              <List link inverted>
                <List.Item as={Link} to="/contactus">الإتصال بنا</List.Item>
                <List.Item  as={Link}  to="/infos">عنوان و بيانات الرسالة</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="الأقسام"  color={MAIN_COLOR} />
              <List link inverted>
                <List.Item as ={Link} to="/courses">الدروس</List.Item>
                <List.Item as ={Link} to="/help">المساعدة</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted color={MAIN_COLOR}>
                جميع الحقوق محفوظة
              </Header>
              <p>
               eman-learning
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Footer;
