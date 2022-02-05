import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  currentQuiz: 3,
  quiz1: [
    {
      id: 0,
      question:
        "صفحة الويب التي يمكن من خلالها عرض بيانات، ويسمح للمستخدم بتعديلها وحفظ البيانات المعُدلة يطلق عليها صفحة:",
      answers: ["Static", "Dynamic", "Home Page"],
      correctAnswerIndex: 1,
    },
    {
      id: 1,
      question:
        "صفحة الويب التي تطلب منك إدخال اسم المستخدم وكلمة المرور، تعني أنه:",
      answers: [
        " لا يتم إجراء معالجة لبياناتها  ",
        "صفحة       Static Web Page",
        " تتعامل مع Database",
      ],
      correctAnswerIndex: 2,
    },
    {
      id: 2,
      question: "جهاز الكمبيوتر الذي يُخزن عليه موقع ويب يطلق عليه",
      answers: ["Database Server	", "Mail Server", "Web Server"],
      correctAnswerIndex: 2,
    },
    {
      id: 3,
      question: " تستخدم لغة الترميز HTML في إنشاء",
      answers: ["Dynamic Web Page ", "Static Web Page ", "PHP Page"],
      correctAnswerIndex: 1,
    },
    {
      id: 4,
      question:
        "صفحات الويب التي تحمل امتداد .PHP تعني أنه يتم تنفيذ كود PHP على",
      answers: [
        " مستعرض الإنترنت",
        " جهاز العميل Client	",
        "جهاز الخادم Server",
      ],
      correctAnswerIndex: 2,
    },
  ],
  quiz1result: null,
  quiz2: [
    {
      id: 0,
      question: "لا تظهر صفحة  Connection.php امام مستخدم صفحة الويب",
      answers: ["صحيح", "خطأ"],
      correctAnswerIndex: 0,
    },
    {
      id: 1,
      question: "يتم تعيين حقل مفتاح أساسي لكل جدول يسمى Primary Key  ",
      answers: ["صحيح", "خطأ"],
      correctAnswerIndex: 0,
    },
    {
      id: 2,
      question: "صفحة الويب الساكنة تتعامل مع قواعد البياناته",
      answers: ["صحيح", "خطأ"],
      correctAnswerIndex: 1,
    },
    {
      id: 3,
      question:
        " عندما تحتوى قاعدة البيانات على جدول واحد فانه يسمى Table Flat ",
      answers: ["صحيح", "خطأ"],
      correctAnswerIndex: 0,
    },
    {
      id: 4,
      question: "الجملةinclude(header.php);  تعنى تضمين صفحة header.php",
      answers: ["صحيح", "خطأ"],
      correctAnswerIndex: 0,
    },
  ],
  quiz2result: null,
  quiz3: [
    {
      id: 0,
      question:
        "لا تظهر اى من التصميمات التالية تصميم صفحة ادخال /اضافة مصطلحاى من التصميمات التالية تصميم صفحة ادخال /اضافة مصطلح",
      answers: ["picture1", "picture2", "picture3"],
      correctAnswerIndex: 1,
    },
  ],
  quiz3result: null,
  quiz4: [
    {
      id: 0,
      question: "خطوات إنشاء صفحة الـ Header باستخدام Expression Web",
      answers: [
        "1.C:/xampp/htdocs/dictionary \n 2. كتابة الاسم Header.php     وحددي  مكان الحفظ  \n 3.File new php \n 4.save",
        "1. كتابة الاسم Header.php     وحددي  مكان الحفظ  \n 2.C:/xampp/htdocs/dictionary  \n 3.File new php \n 4.save",
        "1.File new php \n 2. C:/xampp/htdocs/dictionary  \n كتابة الاسم Header.php     وحددي  مكان الحفظ  \n 4.save",
      ],
      correctAnswerIndex: 2,
    },
  ],
  quiz4result: null,
  checkingUser: false,
  userQuizProgress: {
    lessonsCount: 0,
    results: 0,
  },
};

export const checkuser = createAsyncThunk(
  "quiz/checkuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/results/checkuser`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQurrentQuiz: (state, { payload }) => {
      state.currentQuiz = payload;
    },
    setQuiz1Result: (state, { payload }) => {
      state.quiz1result = payload;
    },
    setQuiz2Result: (state, { payload }) => {
      state.quiz2result = payload;
    },
    setQuiz3Result: (state, { payload }) => {
      state.quiz3result = payload;
    },
    setQuiz4Result: (state, { payload }) => {
      state.quiz4result = payload;
    },
  },
  extraReducers: {
    //
    // ─── Check User ──---─────────────────────────────────────────────────────
    //
    [checkuser.pending]: (state) => {
      state.checkingUser = true;
    },
    [checkuser.fulfilled]: (state, action) => {
      state.userQuizProgress = action.payload;
      state.checkingUser = false;
    },
    [checkuser.rejected]: (state) => {
      state.checkingUser = false;
    },
  },
});
export const {
  setQuiz1Result,
  setQurrentQuiz,
  setQuiz2Result,
  setQuiz3Result,
  setQuiz4Result,
} = quizSlice.actions;
export default quizSlice.reducer;
