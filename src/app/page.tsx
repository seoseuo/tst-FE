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
      <Header text="자기사유 테스트 플랫폼 테스형" icon="logo" parent="/" />
      <TestList testList={testList} />
    </div>
  );
}
