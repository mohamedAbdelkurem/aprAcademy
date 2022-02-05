import React from "react";
import { Card , Container,Header } from "semantic-ui-react";
function Dalil() {
  return (
    <Container>
      <Card color="blue" fluid centered style={{ padding: 10 }}>
        <Header as="h2" textAlign="center">
          دليل المستخدم
        </Header>
        <div>
          <li>
            تحافظ بيئة التعلم التكيفية على خصوصية معلوماتك الشخصية من (اسم
            المستخدم / البريد الالكترونى/كلمة المرور/تاريخ الميلاد).
          </li>
          <li>تخلو بيئة التعلم من اى فيروسات فملفات العمل آمنه للتحميل.</li>
          <li>
            يجب الاجابة على جميع الأسئلة بالاستبيانات وذلك للتعلم بشكل اسرع.
          </li>
          <li>يتم عرض البيانات وفقاٌ لبياناتك المخزنة بالاستبيانات</li>
          <li>يجب تنفيذ التعليمات بصفحات الموقع</li>
          <li>
            نستخدم انماط مختلفة للابحار داخل بيئة التعلم وتختلف من مستخدم لآخر
            وفقاً لنموذج كل مستخدم /متعلم.
          </li>
          <li>يجب قراءة التعليمات داخل كل صفحة لسهولة التجول بالبيئة.</li>
          <li>للانتقال لمستوى اعلى من التعلم يحب اجتياز انشطة واختبار</li>
          <li>
            متاح الخروج من بيئة التعلم فى اى وقت تريده بالضغط على زر خروج أو
            الرجوع للصفحة الرئيسية .
          </li>
          <li>تعمل جميع الايقونات بنقرة واحده عليها.</li>
          <li>تعمل جميع الايقونات بنقرة واحده عليها.</li>
          <li>
            يظهر تغيير واضح فى اشكال الايقونات (الوان / مسارات ) وفقاً لنمط
            الابحار المستخدم بالبيئةالتعليمية التكيفية.
          </li>
        </div>
      </Card>
    </Container>
  );
}

export default Dalil;
