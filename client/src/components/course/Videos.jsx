import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Icon, Loader } from "semantic-ui-react";
import { getVideos } from "../../redux/videos";

function Videos() {
  const params = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(getVideos(params.courseId));
  }, [dispatch,params.courseId]);
  if (videos.loadingVideos) return <Loader />;
  return (
    <div>
      {videos.videos.map((video) => (
        <Card
          key={video.id}
          color="red"
          style={{ width: "100%", textAlign: "right", padding: 8 }}
          as={Link}
          to={`/v/${params.courseId}/${video.id}`}
        >
          <Card.Header as="h3" textAlign="right">
            <Icon name="circle" color="red" />
            {video.title}
          </Card.Header>
          <Card.Description>{video.duration}</Card.Description>
        </Card>
      ))}
    </div>
  );
}

export default Videos;
