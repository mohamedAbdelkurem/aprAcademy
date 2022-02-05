import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Container, Icon } from "semantic-ui-react";
import { get_certificate } from "../redux/certificate";
import Page404 from "./Page404";
const dayjs = require("dayjs");

function Certificate() {
  const dispatch = useDispatch();
  const { certificateId } = useParams();
  const { certificate, loadingCertificate } = useSelector(
    (state) => state.certificates
  );
  useEffect(() => {
    dispatch(get_certificate(certificateId));
  }, [certificateId, dispatch]);
  if (loadingCertificate) return <Loader size="huge" />;

  return (
    <Container
      centered
      fluid
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div style={{ position: "relative" }}>
        <p
          style={{
            fontFamily: "Cairo",
            fontWeight: "bold",
            fontSize: 20,
            position: "absolute",
            top: 202.5,
            left: 290,
            color: "brown",
          }}
        >
          {certificate.user.firstname} {certificate.user.lastname}
        </p>
        <p
          style={{
            fontFamily: "Cairo",
            fontWeight: "bold",
            fontSize: 20,
            position: "absolute",
            top: 267,
            left: 175,
            color: "brown",
          }}
        >
          {getDate(certificate.user.startedAt)}
        </p>
        <p
          style={{
            fontFamily: "Cairo",
            fontWeight: "bold",
            fontSize: 20,
            position: "absolute",
            top: 290,
            left: 517,
            color: "brown",
          }}
        >
          {getDate(certificate.user.finishedAt)}.
        </p>
        <p
          style={{
            fontFamily: "Cairo",
            fontWeight: "bold",
            fontSize: 20,
            position: "absolute",
            top: 318,
            left: 378,
            color: "brown",
          }}
        >
          {certificate.user.grade < 5
            ? "ضعيف"
            : certificate.user.grade < 7
            ? "جيد"
            : certificate.user.grade < 9
            ? "جيد جدًا"
            : certificate.user.grade <= 10 && "إمتياز"}
        </p>
        <img src="/certificate.png" style={{ width: "700px" }} alt="cert" />
        <p>
          {" "}
          رابط المشاركة
          <Icon name="arrow left" color="orange" />
          {`https://eman-learning.com/certificate/${certificateId}`}
        </p>
      </div>
    </Container>
  );
}

const getDate = (isostr) => {
  let str =
    String(dayjs(isostr).get("date")) +
    "/" +
    String(dayjs(isostr).get("month")) +
    "/" +
    String(dayjs(isostr).get("year"));
  return str;
};

export default Certificate;
