import React, { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import Axios from "axios";
import style from "./SuggestionCard.module.scss";
import { useAppContext } from "../../store";
import useAxios from "axios-hooks";

function SuggestionCard(props) {
  const {
    store: { jwtToken, username },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: `http://192.168.0.8:8080/accounts/suggestion/`,
    headers,
  });

  return (
    <div className={style.SuggestionCard}>
      <div className={style.Suggest_top}>
        <p>회원님을 위한 추천</p>
        <a href="#">모두보기</a>
      </div>
      <div className={style.suggest_user}>
        {userList &&
          userList.map((user, index) =>
            index < 5 ? (
              <Suggestion user={user} key={user.id} refetch={refetch} />
            ) : null
          )}
      </div>
    </div>
  );
}

export default SuggestionCard;
