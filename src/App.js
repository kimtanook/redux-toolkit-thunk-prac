// src/App.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPost, deletePost, getPost } from "./redux/modules/postFactory";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // useSelector를 사용하는 것으로 store를 구독하고 state가 변하면 리랜더링 한다.
  const globalPost = useSelector((state) => state.post);
  const globalStatus = useSelector((state) => state.status);
  const globalError = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const onClickGetPost = () => {
    dispatch(getPost());
  };
  const postData = {
    id: uuidv4(),
    title,
    content,
  };
  const onClickAddPost = () => {
    dispatch(addPost(postData));
    setTitle("");
    setContent("");
  };

  const onClickDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {
    onClickGetPost();
  }, []);
  return (
    <div>
      <div>
        {globalPost.map((item) => (
          <div key={uuidv4()}>
            <div>제목 : {item.title}</div>
            <div>내용 : {item.content}</div>
            <button onClick={() => onClickDeletePost(item.id)}>삭제</button>
            <hr />
          </div>
        ))}
      </div>
      <div>상태 : {globalStatus}</div>
      <div>에러 : {globalError ?? "없음"}</div>
      <div>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
        />
      </div>
      <div>
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="content"
        />
      </div>
      <button onClick={onClickAddPost} type="button">
        Create
      </button>
    </div>
  );
};

export default App;
