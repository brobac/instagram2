import React, { useState } from "react";
import AppDownBox from "../../components/accounts/AppDownBox";
import And from "../../components/accounts/And";
import Instagram from "../../components/accounts/Instagram";
import SubmitButton from "../../components/accounts/SubmitButton";
import WhiteBox from "../../components/accounts/WhiteBox";
import { FaFacebookSquare } from "react-icons/fa";
import style from "./Signup.module.css";
import Input from "../../components/accounts/Input";
import Axios from "axios";
import { Route, BrowserRouter, Link, useHistory } from "react-router-dom";
function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    phone_number: "",
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit:", inputs);
    Axios.post("http://192.168.0.8:8080/accounts/signup/", inputs)
      .then((response) => {
        console.log(response);
        history.push("/accounts/login");
      })
      .catch((error) => {
        if (error.response) {
          const { data: fieldErrorMessages } = error.response;
          // console.log(Object.entries(fieldErrorMessages));
          setFieldErrors(
            fieldErrorMessages
            //   Object.entries(fieldErrorMessages).reduce(
            //     (acc, [fieldName, errors]) => {
            //       acc[fieldName] = errors.join(" ");
            //       return acc;
            //     }
            //   ),
            //   {}
          );
          console.log("hello:", fieldErrors);
        }
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <WhiteBox>
        <Instagram />

        <h2 className={style.subTitle}>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </h2>

        <SubmitButton
          text={
            <>
              <FaFacebookSquare size="16" />
              <span>Facebook으로 로그인</span>
            </>
          }
        />
        <And />
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="이메일주소"
            name="email"
            onChange={onChange}
          />

          <Input
            type="text"
            placeholder="휴대폰 번호"
            name="phone_number"
            onChange={onChange}
          />
          <Input
            type="text"
            placeholder="사용자 이름"
            name="username"
            onChange={onChange}
          />

          <Input
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={onChange}
          />
          <SubmitButton text="가입" className={style.joinBtn} />
          {/* <div>
            {fieldErrors === true
              ? fieldErrors.username[0]
              : fieldErrors.email[0]}
          </div> */}
          <p className={style.guide}>
            가입하면 Instagram의 <a href="#">약관</a>,{" "}
            <a href="#">데이터 정책</a>및 <a href="#">쿠키 정책</a>에 동의하게
            됩니다.
          </p>
        </form>
      </WhiteBox>
      <WhiteBox className={style.joinBox}>
        <div>
          <p className={style.joinAsk}>
            계정이 있으신가요?
            <Link to="/accounts/login">로그인</Link>
          </p>
        </div>
      </WhiteBox>
      <AppDownBox />
    </div>
  );
}

export default Signup;
