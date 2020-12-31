import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useAppContext } from "../../store";
import { useHistory } from "react-router-dom";
import AppLayout from "./AppLayout";
import Footer from "./Footer";
import style from "./CreatePost.module.scss";
import { BsUpload } from "react-icons/bs";
import useAxios from "axios-hooks";

export default function CreatePost(props) {
  const [imgBase64, setImgBase64] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState({
    caption: "",
    location: "",
  });
  const history = useHistory();
  const {
    store: { jwtToken },
  } = useAppContext();

  useEffect(() => {
    console.log("이미지는 올라옴");
  }, [images]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setDescription({
      ...description,
      [name]: value,
    });
  };
  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImages(event.target.files[0]); // 파일 상태 업데이트
    }
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
    <>
      <AppLayout>
        <div className={style.postBox}>
          <form className={style.postForm} onSubmit={onSubmit}>
            <div className={style.filebox}>
              <label className={style.fileLabel} for="file">
                사진 추가
              </label>
              <input
                className={style.file}
                type="file"
                accept="img/*"
                name="photo"
                id="file"
                placeholder="이미지"
                onChange={handleChangeFile}
              />
              <button className={style.submitBtn} type="submit">
                올리기
              </button>
            </div>

            <input
              className={style.location}
              type="text"
              name="location"
              placeholder="location"
              onChange={onChange}
            />
            <textarea
              className={style.caption}
              type="text"
              name="caption"
              placeholder="caption"
              onChange={onChange}
            />
          </form>
          <div className={style.imgPrevBox}>
            <div className={style.imgPrev}>
              <img src={imgBase64} alt="prevImage1" />
            </div>
            <div className={style.imgPrev}></div>
            <div className={style.imgPrev}></div>
            <div className={style.imgPrev}></div>
          </div>
        </div>
      </AppLayout>
      <Footer />
    </>
  );
}
