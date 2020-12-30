import React, { useState } from "react";
import style from "./LoginCard.module.css";
import Input from "./Input";
import And from "./And";
import WhiteBox from "./WhiteBox";
import Instagram from "./Instagram";
import AppDownBox from "./AppDownBox";
import SubmitButton from "./SubmitButton";
import Axios from "axios";
<<<<<<< HEAD
import { Link, useHistory, useLocation } from "react-router-dom";
=======
import { useHistory, useLocation } from "react-router-dom";
>>>>>>> 87208b2b0fb6a960a6e039a5ada57eac90d9c069
import { setToken, useAppContext } from "../../store";
import classNames from "classnames";

function LoginCard({ className }) {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onSubmit = (e) => {
    async function fn() {
      e.preventDefault();
      const { email, password } = inputs;
      const data = { email, password };
      try {
        const response = await Axios.post(
          "http://192.168.0.8:8080/accounts/login/",
          data
        );

        const {
          token,
          user: { username },
        } = response.data;
        dispatch(setToken(token, username));

        console.log("response:", response);

        history.push(loginRedirectUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fn();
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
      <WhiteBox className={classNames(style.loginBox, className)}>
        <Instagram />
        <form onSubmit={onSubmit}>
          <div className={style.inputBox}>
            <Input
              type="text"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              className={style.input1}
              name="email"
              onChange={onChange}
            ></Input>
            <Input
              type="password"
              placeholder="비밀번호"
              className={style.input2}
              name="password"
              onChange={onChange}
            ></Input>
<<<<<<< HEAD
            <SubmitButton
              text={"로그인"}
              inputs={(inputs.email, inputs.password)}
            ></SubmitButton>
=======
            <SubmitButton text={"로그인"} inputs={inputs}></SubmitButton>
>>>>>>> 87208b2b0fb6a960a6e039a5ada57eac90d9c069
            <And className={style.and}></And>
          </div>
          <button className={style.facebook}>
            <span></span>
            <span>Facebook으로 로그인</span>
          </button>
          <a href="http://www.naver.com" className={style.pwReset}>
            비밀번호를 잊으셨나요?
          </a>
        </form>
      </WhiteBox>
      <WhiteBox className={style.joinBox}>
        <div>
          <p className={style.joinAsk}>
            계정이 없으신가요?
<<<<<<< HEAD
            <Link to="/accounts/signup/" className={style.joinLink}>
              가입하기
            </Link>
=======
            <a href="http://www.naver.com" className={style.joinLink}>
              가입하기
            </a>
>>>>>>> 87208b2b0fb6a960a6e039a5ada57eac90d9c069
          </p>
        </div>
      </WhiteBox>
      <AppDownBox></AppDownBox>
    </div>
  );
}
export default LoginCard;
