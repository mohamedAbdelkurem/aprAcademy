import React, { useEffect } from "react";
import { Card, Header, Container } from "semantic-ui-react";

import "./staticpages.css";

export default function DataMaster() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Card color="blue" fluid centered style={{ padding: 10 }}>
        <Header as="h2" textAlign="center">
          عنوان رساله الماجستير{" "}
        </Header>

        <div dir="rtl">
          <p style={{ fontSize: "1.2em" }}>
            اثر التفاعل بين مستوي الخبره(مبتديء-خبير )و نمط الابحار داخل بيئة
            تعلم تكيفيه في تنميه مهارات البرمجه لدي طلاب المرحلة الثانوية{" "}
          </p>
          <h4
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "20px",
              fontFamily: "Cairo",
            }}
          >
            اشراف
          </h4>
          <div className="DrNames">
            <div className="right">
              <ul>
                <li style={{ fontWeight: "bold" }}>ا.د/خالد محمد فرجون</li>
                <p>استاذ و رئيس قسم تكنولوجيا تعليم - كليه تربيه جامعه حلوان</p>
              </ul>
            </div>
            <div className="left">
              <ul>
                <ul>
                  <li style={{ fontWeight: "bold" }}> م.د/رؤيات الخطيب </li>
                  <p> مدرس تعليم - كليه تربيه جامعه حلوان</p>
                </ul>
              </ul>
            </div>
          </div>
          <div className="owner"></div>
        </div>
        <Card.Meta style={{ color: "black" }} textAlign="left">
          <p>
            <span style={{ fontWeight: "bold" }}>اعداد الباحثه : </span> ايمان
            محمد السيد سليم{" "}
          </p>
        </Card.Meta>
      </Card>
    </Container>
  );
}
