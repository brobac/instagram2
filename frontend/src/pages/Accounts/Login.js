import React, { useState } from "react";
import { Card, Form, Input, Button, notification } from "antd";
import AppDownBox from "../../components/accounts/AppDownBox";
import And from "../../components/accounts/And";
import Instagram from "../../components/accounts/Instagram";
import SubmitButton from "../../components/accounts/SubmitButton";
import WhiteBox from "../../components/accounts/WhiteBox";
import { FaFacebookSquare } from "react-icons/fa";
import style from "./Signup.module.css";
// import Input from "../../components/accounts/Input";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import {
  Route,
  BrowserRouter,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { setToken, useAppContext } from "../../store";

export default function Login() {
  const { store, dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };
  // console.log("loaded jwtToken", jwtToken);

  const onFinish = (values) => {
    async function fn() {
      const { email, password } = values;

      setFieldErrors({});

      const data = { email, password };
      try {
        const response = await Axios.post(
          "http://192.168.0.8:8080/accounts/login/",
          data
        );
        const {
          data: { token: jwtToken },
        } = response;

        dispatch(setToken(jwtToken));
        // setJwtToken(jwtToken);
        // console.log("jwtToken", jwtToken);

        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });

        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
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
                  help: errors.join(" "),
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
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete={"false"}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { min: 5, message: "5글자 입력해주세요." },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
