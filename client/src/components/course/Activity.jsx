//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container,  Grid, Header,  Tab } from "semantic-ui-react";
import BreadcrumbComponent from "../Lesson/BreadcrumbComponent";
import { useParams } from "react-router-dom";
import { getActivities, get_activity } from "../../redux/activities";
var md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
  replaceLink: function (link) {
    return link.substring(6);
  },
}).use(require("markdown-it-replace-link"));


function Activity() {
  const dispatch = useDispatch();
  const { loadingActivity,  activity } =
    useSelector((state) => state.activities);
  const { courseId, activityId } = useParams();
  useEffect(() => {
    dispatch(getActivities(courseId));
    dispatch(get_activity(activityId));
    window.scrollTo(0, 0);
  }, [dispatch, activityId, courseId]);
  return (
    <Container>
      {/*  ───────────────────────────────────────────────────────────────────────Breadcrumb */}
      <BreadcrumbComponent
        courseTitle={activity && activity.course.title}
        courseId={courseId}
        loading={loadingActivity}
        title={activity && activity.title}
      />
      {/*──────────────────────────────────────────────────────────────────────────────Header*/}
      <Header as="h2" block color="blue">
        <Header.Content>
          {!loadingActivity && activity && activity.title}
        </Header.Content>
      </Header>
      {/* ──────────────────────────────────────────────────────────────────────────────Grid */}
      <Grid stackable>
        {/*  ──────────────────────────────────────────────────────────────────────Left side */}
        <Grid.Column width={16}>
          {/*───────────────────────────────────────────────────────────────────────────ACTIVITY*/}
          <Tab
            menu={{ secondary: true, pointing: true }}
            renderActiveOnly
            panes={[
              {
                render: () => (
                  <Tab.Pane attached={false} loading={loadingActivity}>
                    {activity && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: md.render(JSON.parse(activity.body)),
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
    </Container>
  );
}

export default Activity;
