import React, { useState } from "react";
import Axios from "axios";
import { useAppContext } from "../../store";
import { useHistory } from "react-router-dom";

export default function CreatePost(props) {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState({
    caption: "",
    location: "",
  });
  const history = useHistory();
  const {
    store: { jwtToken },
  } = useAppContext();

  const onChange = (e) => {
    const { name, value } = e.target;
    setDescription({
      ...description,
      [name]: value,
    });
  };
  const onChangeImage = (e) => {
    setImages(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const headers = { Authorization: `JWT ${jwtToken}` };
    const formData = new FormData();
    formData.append("caption", description["caption"]);
    formData.append("location", description["location"]);
    formData.append("photo", images);
    Axios({
      url: `http://192.168.0.8:8080/api/post/`,
      method: "post",
      data: formData,
      headers,
    })
      .then((response) => {
        console.log("포스트 추가 성공");
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="img/*"
          name="photo"
          placeholder="이미지"
          onChange={onChangeImage}
        />
        <input
          type="text"
          name="caption"
          placeholder="caption"
          onChange={onChange}
        />
        <input
          type="text"
          name="location"
          placeholder="location"
          onChange={onChange}
        />
        <button type="submit">올려</button>
      </form>
    </div>
  );
}
