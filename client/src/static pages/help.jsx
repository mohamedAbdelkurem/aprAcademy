import React, { Component } from "react";
import { Accordion, Icon, Header } from "semantic-ui-react";
import ResponsiveEmbed from "react-responsive-embed";
export default class AccordionExampleFluid extends Component {
  state = { activeIndex: 0 };
  componentDidMount() {
    window.scrollTo(0, 0);
    }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        <Header style={{ textAlign: "center" }}> صفحة المساعدة </Header>

        <div dir="rtl">
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
              content=""
            >
              <Header style={{ textAlign: "center" }}>
                {" "}
                مصطلحات ومفاهيم تهمك <Icon name="dropdown" />{" "}
              </Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <ul>
                <li style={{ fontWeight: "bold" }}>
                  مفهوم بيئه التعلم التكيفيه
                </li>
                <p>
                  {" "}
                  هي بيئه تعتمد علي تعدديه و تنويع عرض المحتوي و تطويعها وفقا
                  لاساليب التعلم الخاصه بكل متعلم وقيقدم المحتوي و كانه موجه لكل
                  طالب علي حده و بحيث يتم تقديم مجموعه متنوعه من الانشطه
                  التكيفيه تكون مراعسه لاختلاف انماط المتعلمين و مناسبه لقدراتهم
                  الذهنيه
                </p>
                <li style={{ fontWeight: "bold" }}> مفهوم الابحار </li>
                <p>
                  {" "}
                  هو التنقل و غالبا ما يحدث ف نفس الصفحه الموقع او بصفحات الموقع
                  المختلفه
                </p>
                <li style={{ fontWeight: "bold" }}>مفهوم اساليب التعلم</li>
                <p>
                  {" "}
                  هي مجموعه من السلوكيات المعرفيه و الوجدانيه و النفسيه , و التي
                  تعمل كمؤشرات نسبيا لكيفيه ادراك و تفاعل و استجابه الطالب مع
                  بيئه التعلم{" "}
                </p>
                <li style={{ fontWeight: "bold" }}> مفهوم الروابط </li>
                <p>
                  {" "}
                  ... المعروفه ايضا باسم الوصلات الوارده , هي وصات ذات كلمه
                  معينه الي موقع او صفحه علي الانترنت , كلما كان الترتيب و اهميه
                  الموقه عاليه طلما حظي الموقع ف الرابط النصي بتقييم اعلي لدي
                  محركات البحث , و التي تعد من احدي عناصر (تحسين محركات البحث )
                  التي تساهم في رفع ترتيب الموقع و يمكن ان يكون الرابط صوره او
                  صوت او فيديو{" "}
                </p>
              </ul>

              {/* <p>
             A dog is a type of domesticated animal. Known for its loyalty and
             faithfulness, it can be found as a welcome guest in many households
             across the world.
           </p> */}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Header style={{ textAlign: "center" }}>
                {" "}
                تحميل برامج المنهج <Icon name="dropdown" />{" "}
              </Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <ul>
                <li style={{ fontWeight: "bold" }}>كتاب المدرسة:</li>
                <a>
                  http://elearning1.moe.gov.eg/sec/semester1/Grade2/pdf/ECD__2sec_s1_a.pdf
                </a>
                <li style={{ fontWeight: "bold" }}>تحميل برنامج xampp</li>
                <a>
                  http://moe.gov.eg/depertments/computer_edu/books/sec/xampplite.rar
                </a>

                <li style={{ fontWeight: "bold" }}>
                  تحميل تطبيق Expression Web
                </li>
                <a>http://adyou.me/ozNS</a>
              </ul>
            </Accordion.Content>

    
           
          </Accordion>
        </div>
      </div>
    );
  }
}
