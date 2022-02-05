//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import {
  Button,
  Form,
  Grid,
  Icon,
  Segment,
  Header,
  Image
} from "semantic-ui-react";
import { MAIN_COLOR } from "../../utilities/theme";

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { createMessage, resetContactus } from "../../redux/message";

const ContactUs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetContactus())
  }, [dispatch])
  const [formValues, setFormValues] = useState({
    firstname: "",
    email: "",
    messageTitle: "",
    message: "",
  });

  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const { errors, loading, posted } = useSelector((state) => state.messages);

  const handleSubmit = () => {
    dispatch(createMessage(formValues));
  };
  if (posted) return <Header style={{ textAlign: 'center' }}>  تم إرسال الرسالة بنجاح <Icon name='thumbs up' size='big' color='green' /></Header>

  return (
    <Grid
      padded
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      textAlign="center"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header>للتواصل معنا  </Header>
        <Image  src="/logo.png" centered size="small" />

        <Form
          size="large"
          onSubmit={handleSubmit}
          loading={loading}
          error={errors}
        >
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="email"
              iconPosition="left"
              placeholder="البريد الإلكتروني"
              onChange={handleChange}
              autoComplete="email"
              focus
              label="البريد الإلكتروني"
              required
              error={errors && errors.email}
            />
            <Form.Input
              fluid
              name="firstname"
              icon="firstname"
              iconPosition="left"
              placeholder="الاسم الكامل"
              onChange={handleChange}
              autoComplete="firstname"
              focus
              required
              label="الاسم الكامل"

              error={errors && errors.firstname}
            />
            <Form.Input
              fluid
              name="messageTitle"
              icon="message"
              iconPosition="left"
              placeholder="العنوان"
              onChange={handleChange}
              autoComplete="message Title"
              focus
              label="العنوان"

              required
              error={errors && errors.messageTitle}
            />
            <Form.TextArea
              fluid
              name="message"
              icon="message"
              iconPosition="left"
              placeholder="الرسالة"
              onChange={handleChange}
              autoComplete="message"
              focus
              required
              label="الرسالة"
              error={errors && errors.message}
            />
            <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
              أرسل
            </Button>
          </Segment>
        </Form>

      </Grid.Column>
    </Grid>
  );
};

export default ContactUs;