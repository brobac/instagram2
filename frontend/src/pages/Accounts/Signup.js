import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
  const onFinish = (values) => {
    async function fn() {
      const { username, password, email, name } = values;

      setFieldErrors({});

      const data = { username, password, email, name };
      try {
        const response = await Axios.post(
          "http://192.168.0.8:8080/accounts/signup",
          data
        );

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
            icon: <FrownOutlined style={{ color: "#ff3334" }} />,
          });
          const { data: fieldErrorMessages } = error.response;
          // fieldErrorMessages => {username: "m1 m2", password: []}
          setFieldErrors(
            Object.entries(fieldErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                //errors:  ["m1", "m2"].join(" ") => "m1 m2"
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
              },
              {}
            )
          );
        }
      }
    }
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        // {...fieldErrors.password}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: false,
            message: "Please input your name!",
          },
        ]}
        // {...fieldErrors.password}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
          { min: 5, message: "5글자 이상 입력해주세요." },
        ]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
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
  );
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export default Signup;
