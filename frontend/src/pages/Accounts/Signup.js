import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import AppDownBox from "../../components/accounts/AppDownBox";
import And from "../../components/accounts/And";
import Instagram from "../../components/accounts/Instagram";
import SubmitButton from "../../components/accounts/SubmitButton";
import WhiteBox from "../../components/accounts/WhiteBox";
import { FaFacebookSquare } from "react-icons/fa";
import style from "./Signup.module.css";
// import Input from "../../components/accounts/Input";
import Axios from "axios";
import { Route, BrowserRouter, Link, useHistory } from "react-router-dom";
function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { email, phonenumber, username, password } = values;

      setFieldErrors({});

      const data = { email, phonenumber, username, password };
      try {
        await Axios.post("http://192.168.0.8:8080/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: "m1 m2", password: [] }
          // python: mydict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                // errors : ["m1", "m2"].join(" ") => "m1 "m2"
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors,
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
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

        <Form
          {...layout}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete={"false"}
          className={style.formlayout}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            {...fieldErrors.email}
          >
            <Input
              style={{ width: "268px" }}
              placeholder="휴대폰 번호 또는 이메일 주소"
            />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: false }]}>
            <Input placeholder="성명" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 5, message: "5글자 입력해주세요." },
            ]}
            hasFeedback
            {...fieldErrors.username}
          >
            <Input placeholder="사용자 이름" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className={style.guide}>
          가입하면 Instagram의 <a href="#">약관</a>, <a href="#">데이터 정책</a>
          및 <a href="#">쿠키 정책</a>에 동의하게 됩니다.
        </p>
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
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default Signup;
