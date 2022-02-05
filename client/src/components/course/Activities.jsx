import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Icon, Loader } from "semantic-ui-react";
import { getActivities } from "../../redux/activities";

function Activities() {
  const params = useParams();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(getActivities(params.courseId));
  }, [dispatch, params.courseId]);
  if (activities.loadingActivities) return <Loader />;
  return (
    <div>
      {activities.activities.map((activity) => (
        <Card
          key={activity.id}
          color="red"
          style={{ width: "100%", textAlign: "right", padding: 8 }}
          as={Link}
          to={`/a/${params.courseId}/${activity.id}`}
        >
          <Card.Header as="h3" textAlign="right">
            <Icon name="circle" color="red" />
            {activity.title}
          </Card.Header>
        </Card>
      ))}
    </div>
  );
}

export default Activities;
