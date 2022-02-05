import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { delete_video, get_all_videos } from "../../redux/videos";
import { Link } from "react-router-dom";

const Video = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_videos());
  }, [dispatch]);
  const { videos, deleting } = useSelector((state) => state.videos);
  return (
    <>
      <Button as={Link} to="/admin/video/add">
        إضافة فيديو
      </Button>
      <Table fixed textAlign="right">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>العنوان</Table.HeaderCell>
            <Table.HeaderCell>الرابط</Table.HeaderCell>
            <Table.HeaderCell>المدة</Table.HeaderCell>
            <Table.HeaderCell>الكورس</Table.HeaderCell>
            <Table.HeaderCell>العمليات</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {videos.map((video) => (
            <Table.Row key={video.id}>
              <Table.Cell>{video.title}</Table.Cell>
              <Table.Cell>{video.link}</Table.Cell>
              <Table.Cell>{video.duration}</Table.Cell>
              <Table.Cell>{video.course.title}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(delete_video(video.id));
                  }}
                  loading={deleting}
                >
                  حذف
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Video;
