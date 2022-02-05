//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Embed, Grid, Header, Icon, Tab } from "semantic-ui-react";
import BreadcrumbComponent from "../Lesson/BreadcrumbComponent";
import { useParams } from "react-router-dom";
import { getVideos, get_video } from "../../redux/videos";

const EmbedComponent = ({ link }) => <Embed url={link} />;

const VideosTab = ({ videos, videoId, courseId }) => {
  return (
    <Grid padded divided>
      <Grid.Row divided>
        <Grid.Column>
          <Header as="h4" icon="list" content="المحتوى" />
        </Grid.Column>
      </Grid.Row>
      {videos &&
        videos.map((video) => (
          <Grid.Row
            divided
            style={{
              marginTop: 1,
              backgroundColor:
                videoId === video.id.toString() ? "#8AC1E6" : "white",
            }}
            as={Link}
            to={`/v/${courseId}/${video.id}`}
          >
            <Grid.Column
              verticalAlign="middle"
              textAlign="center"
              mobile={2}
              tablet={2}
              largeScreen={1}
            >
              <Icon
                dir="ltr"
                name={videoId === video.id ? "square" : "circle"}
              />
            </Grid.Column>
            <Grid.Column mobile={13} tablet={14} largeScreen={15}>
              <Header size="small" color="black">
                {video.title}
              </Header>
            </Grid.Column>
          </Grid.Row>
        ))}
    </Grid>
  );
};

function Lesson() {
  const dispatch = useDispatch();
  const { loadingVideo, loadingVideos, video, videos } = useSelector(
    (state) => state.videos
  );
  const { courseId, videoId } = useParams();
  useEffect(() => {
    dispatch(getVideos(courseId));
    dispatch(get_video(videoId));
    window.scrollTo(0, 0);
  }, [dispatch, videoId, courseId]);
  return (
    <Container>
      {/*  ───────────────────────────────────────────────────────────────────────Breadcrumb */}
      {!loadingVideo && (
        <BreadcrumbComponent
          courseTitle={video.course.title}
          courseId={courseId}
          loading={loadingVideo}
          title={video.title}
        />
      )}
      {/*──────────────────────────────────────────────────────────────────────────────Header*/}
      <Header as="h2" block color="blue">
        <Header.Content>{!loadingVideo && video && video.title}</Header.Content>
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
                menuItem: "مشاهدة",
                render: () => (
                  <Tab.Pane attached={false} loading={loadingVideo}>
                    <EmbedComponent link={video && video.link} />
                  </Tab.Pane>
                ),
              },
            ]}
          />

          {/*────────────────────────────────────────────────────────────────────────────Tabs*/}
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: "الفيديوهات",
                render: () => (
                  <Tab.Pane attached={false} loading={loadingVideos}>
                    <VideosTab
                      videos={videos}
                      videoId={videoId}
                      courseId={courseId}
                    />
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

export default Lesson;
