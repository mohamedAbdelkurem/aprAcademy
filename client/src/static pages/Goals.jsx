import React, { useEffect } from 'react'
import './staticpages.css'
import { Container,Header} from 'semantic-ui-react'
export default function Goals() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <Container dir="rtl" className="goalsWrapper">
            <Header as="h2" textAlign="center" color="blue" >الاهداف </Header>
        <p className="sideTitle">  فى نهاية الرحلة فى بيئتنا التكيفية يتوقع أن تكون الطالبة قادرًة على  :</p>
        <ol>
            <li className="li">	تصميم مكونات الصفحة الرئيسية لصفحات موقع قاموس المصطلحات </li>
            <li className="li">	تحدد الروابط اللازمة للإبحار بين صفحات الموقع </li>
            <li className="li">	تتعرف بعض المفاهيم الأساسية المتعلقة بقواعد البيانات </li>
            <li className="li">	تنشىء قاعدة بيانات لمشروع قاموس مصطلحات الكمبيوتر</li>
            <li className="li">	تستخدم برنامج MYSQL فى إنشاء قاعدة بيانات</li>
            <li className="li">	تمارس خطوات إنشاء موقع بإستخدام تطبيق Expression Web</li>
            <li className="li">	تشرح مكونات الشاشة الرئيسية لبرنامج Expression Web</li>
        <li className="li">	تعرف لغة البرمجة PHP.</li>
        <li className="li">	توظف إحدى تطبيقات إنشاء مواقع ويب فى الربط بين صفحات موقع ويب</li>
      
        </ol>
        </Container>
    )
}
