import React from "react";
import {
  ContactsOutlined,
  ReadOutlined,
  TableOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { BsBookmark } from "react-icons/bs";
import { Route, Link } from "react-router-dom";
import style from "./TabMenu.module.scss";
import styled from "styled-components";

const tabTitle = [
  <Link to="/profile">
    <TableOutlined /> <span>게시물</span>
  </Link>,
  <Link to="/profile/channel">
    <VideoCameraOutlined /> <span>IGTV</span>
  </Link>,
  <Link to="/profile/saved">
    <BsBookmark /> <span>저장됨</span>
  </Link>,
  <Link to="/profile/tagged">
    <ContactsOutlined /> <span>태그됨</span>
  </Link>,
];

const List = styled.ul`
  display: flex;
  justify-content: center;
  width: 768px;
`;

const Tab = styled.li`
  color: gray;
  font-weight: bold;
  font-size: 13px;
  margin: 0 30px;
  cursor: pointer;
  border-top: ${(props) => (props.active ? "1px solid black" : "none")};
`;

function TabMenu({ TabMenuHandler, activeTab }) {
  return (
    <>
      <List>
        {tabTitle.map((str, idx) => {
          return (
            <Tab
              active={activeTab === idx}
              key={idx}
              onClick={() => {
                TabMenuHandler(idx);
              }}
            >
              {str}
            </Tab>
          );
        })}
      </List>
    </>
  );
}

export default TabMenu;
