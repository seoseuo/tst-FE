"use client";

import { useEffect, useState } from "react";
import Header from "../component/main-header";
import TestList from "../component/test/test-list";
import { fetchTestList } from "../lib/api"; 

export default function Home() {
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    fetchTestList()
      .then((data) => setTestList(data))
      .catch((err) => console.error("테스트 목록 가져오기 실패", err));
  }, []);

  return (
    <div>
      <Header text="어 형이야~ 테스트 하고 가~ㅋㅋ" icon="logo" parent="/" />
      <TestList testList={testList} />
    </div>
  );
}
