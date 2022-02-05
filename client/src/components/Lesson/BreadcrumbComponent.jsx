import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Breadcrumb, Icon, Segment } from "semantic-ui-react";

const BreadcrumbComponent = ({ title,loadingLesson,courseTitle,courseId }) => (
  <Segment>
    <Breadcrumb size="large" as="div">
      <Breadcrumb.Section link as={Link} to="/">
        <Icon name="home" />
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link as={Link} to="/courses">
        الدروس
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link as={Link} to={`/courses/${courseId}`}>
        {courseTitle}
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section active> {!loadingLesson && title}</Breadcrumb.Section>
    </Breadcrumb>
  </Segment>
);

export default BreadcrumbComponent;
