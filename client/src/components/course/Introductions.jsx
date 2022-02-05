//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Header, Loader, Tab,Button } from "semantic-ui-react";
import BreadcrumbComponent from "../Lesson/BreadcrumbComponent";
import { useParams } from "react-router-dom";
import { getIntroductions } from "../../redux/introductions";
import ResponsiveEmbed from "react-responsive-embed";
import { Link } from "react-router-dom";
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
});
function Introduction() {
  const dispatch = useDispatch();
  const { introductions, loadingIntroductions } = useSelector(
    (state) => state.introductions
  );
  const { courseId } = useParams();
  useEffect(() => {
    dispatch(getIntroductions(courseId));
    window.scrollTo(0, 0);
  }, [dispatch, courseId]);
  if (loadingIntroductions) return <Loader />;
  return (
    <Container>
      {/*  ───────────────────────────────────────────────────────────────────────Breadcrumb */}
      {introductions && (
        <BreadcrumbComponent
          courseTitle={introductions[0].course.title}
          courseId={courseId}
          loading={loadingIntroductions}
          title={introductions[0].title}
        />
      )}

      {/*──────────────────────────────────────────────────────────────────────────────Header*/}
      <Header as="h2" block color="blue">
        <Header.Content>
          {!loadingIntroductions && introductions && introductions[0].title}
        </Header.Content>
      </Header>
      {/* ──────────────────────────────────────────────────────────────────────────────Grid */}
      <Grid stackable>
        {/*  ──────────────────────────────────────────────────────────────────────Left side */}
        <Grid.Column width={16}>
          {/*───────────────────────────────────────────────────────────────────────────Video*/}
          <Tab
            menu={{ secondary: true, pointing: true }}
            renderActiveOnly
            panes={[
              {
                menuItem: "التمهيد",
                render: () => (
                  <Tab.Pane attached={false} loading={loadingIntroductions}>
                    {introductions[0] && introductions[0].embededFile && (
                      <ResponsiveEmbed
                        src={introductions[0].embededFile}
                        allowfullscreen
                      />
                    )}
                    {introductions[0].body && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: md.render(JSON.parse(introductions[0].body)),
                        }}
                      ></div>
                    )}
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Grid.Column>
      </Grid>
      <Button
        fluid
        style={{ marginTop: 10, marginBottom: 10 }}
        as={Link}
        to={`/courses/${courseId}`}
      >
        العودة
      </Button>
    </Container>
  );
}

export default Introduction;
