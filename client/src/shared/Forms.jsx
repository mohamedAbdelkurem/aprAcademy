import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, Divider, Button } from "semantic-ui-react";
import { update_user_preference } from "../redux/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
export const toppings = [
  {
    name: "سمعت عن لغات البرمجة ؟",
    price: 2,
  },
  {
    name: "هل درست أي لغة البرمجة فى الاعوام الدراسية السابقة؟",
    price: 2,
  },
  {
    name: "الديك معرفة بالمبادىء والقواعد الاساسية فى البرمجة؟",
    price: 3,
  },
  {
    name: "أسبق لك استخدام لغة البرمجة والتطبيق عملياً بها ؟",
    price: 4,
  },
  {
    name: "هل تواجهي صعوبة في تعلم البرمجة باللغة الإنجليزية؟",
    price: 1,
  },
  {
    name: "شرح البرمجة باللغة العربية دافع لك لتعلم البرمجة بشكل أفضل.؟",
    price: 3,
  },
  {
    name: "الديك فكرة بلغة البرمجة PHP",
    price: 5,
  },
  {
    name: " هل لديك الرغبة فى تصميم موقع بلغة البرمجة؟",
    price: 5,
  },
];

export const toppings2 = [
  {
    name: "هل تفضل التعلم بدعم وتوجيه المعلم بشكل دائم ؟",
    price: 0,
  },
  {
    name: "ارغب التسلسل فى الخطوات اثناء عملية التعلم ",
    price: 0,
  },
  {
    name: "هل ترغب فى اخفاء الاجزاء التى قمت بتعلمها",
    price: 0,
  },
  {
    name: "اتفضلي  احيانا الرجوع للخطوة السابقة للتذكر؟؟",
    price: 0,
  },

  {
    name: " افضل التعلم وفقا لاختيارى لاسلوب التعلم ومعرفتي",
    price: 1,
  },
  {
    name: "ارغب  كثيرا معرفة ما بالروابط من خلال التلميحات قبل فتحها ",
    price: 1,
  },
  {
    name: "افضل معرفة تاريخ زيارتى للمواقع ",
    price: 1,
  },
  {
    name: "اريد معرفة اذا كنت زرت الرابط سابقا ام لا",
    price: 1,
  },
  {
    name: "افضل تمييز عناصرالمحتوى (بالوان اورموز- تعليقات توضيحية)؟",
    price: 1,
  },
];
export default function Forms() {
  const [checkedStateLevel, setCheckedStateLevel] = useState(
    new Array(toppings.length).fill(false)
  );

  const [levelScore, setLevelScore] = useState(0);

  const handleOnChangeLevel = (position) => {
    const updatedCheckedStateLevel = checkedStateLevel.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedStateLevel(updatedCheckedStateLevel);

    const s = updatedCheckedStateLevel.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + toppings[index].price;
      }
      return sum;
    }, 0);

    setLevelScore(s);
  };

  //======================================================
  const [checkedStateType, setCheckedStateType] = useState(
    new Array(toppings2.length).fill(false)
  );

  const [typeScore, setTypeScore] = useState(0);

  const handleOnChangeType = (position) => {
    const updatedCheckedStateType = checkedStateType.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedStateType(updatedCheckedStateType);

    const s = updatedCheckedStateType.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + toppings2[index].price;
      }
      return sum;
    }, 0);

    setTypeScore(s);
  };
  const dispatch = useDispatch();
  const { updatingPreferences, user } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeScore, levelScore);
   dispatch(update_user_preference({ typeScore, levelScore }));
  };
  if (user && user.level && user.type) return <Redirect to="/courses" />;
  return (
    <Card centered style={{ padding: 5, maxWidth: 600 }} fluid>
      <Card.Header as="h3">اجيبى على الأسئلة التالية</Card.Header>
      <Card.Header as="h3">الجزء الأول</Card.Header>
      <List>
        {toppings.map(({ name, price }, index) => (
          <li key={index}>
            <div className="toppings-list-item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedStateLevel[index]}
                  onChange={() => handleOnChangeLevel(index)}
                />
              </div>
              <hr />
              <Divider horizontal inverted fitted />
            </div>
          </li>
        ))}
      </List>
      <Card.Header as="h3">الجزء الثاني</Card.Header>

      <List>
        {toppings2.map(({ name }, index) => (
          <li key={index}>
            <div className="toppings-list-item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedStateType[index]}
                  onChange={() => handleOnChangeType(index)}
                />
              </div>
              {index === 3 && <hr />}
              <hr />
              <Divider horizontal inverted fitted />
            </div>
          </li>
        ))}
      </List>
      <Button loading={updatingPreferences} primary onClick={handleSubmit}>
        حفظ
      </Button>
    </Card>
  );
}
