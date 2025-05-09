"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { fetchTestDetail, startTest } from "../../lib/api";
import Header from "../../component/main-header";
import { Test } from "../../types/test";
import { Head } from "next/document";  // Head 컴포넌트 추가

const TestComponent = () => {
  
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');
  const [test, setTest] = useState<Test>();
  const [showWarning, setShowWarning] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (testId) {
      const fetchData = async () => {
        try {
          const testData = await fetchTestDetail(Number(testId));
          console.log('테스트 상세 정보:', testData);
          setTest(testData);
          localStorage.setItem("testId", testData.testId);          
          
        } catch (err) {
          console.error('테스트 상세 정보 가져오기 실패:', err);
        }
      };

      fetchData();
    }
  }, [testId]);

  const handleStartTest = async () => {
    const userCodeInput = document.getElementById('user-code') as HTMLInputElement;
    if (!userCodeInput.value) {
      setShowWarning(true);
      return;
    }
    // 테스트 시작 요청
    if (test?.testId !== undefined) {
      try {
        const startData = await startTest(test.testId, userCodeInput.value);
        console.log("테스트 시작 startData :", startData);
        console.log("테스트 시작 startData.userCode :", startData.userCode);
        console.log("테스트 시작 startData.questionId :", startData.questionId);

        localStorage.setItem("userCode", startData.userCode);
        localStorage.setItem("size", startData.questionId);

        router.push(`/question`);
      } catch (error) {
        console.error("테스트 시작 실패", error);
      }
    } else {
      console.error("테스트 ID가 정의되지 않았습니다");
    }
  };

  return (
    <div>
      <Head>
        <meta property="og:title" content={test?.testName || "테스트"} />
        <meta property="og:description" content={test?.testDes || "테스트 설명"} />
        <meta property="og:image" content={test?.testImg1 ? `/s3/${test?.testImg1}` : "/preview.png"} />
        <meta property="og:url" content={`https://tessbro.site/test?testId=${testId}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Header text="" icon="back" parent="/" />

      <div className="get-test-container">
        <div>
          <span className="light" style={{ fontSize: '15px', color: '#888888' }}>
            {test?.testDes}
          </span>
          <br />
          <span className="bold" style={{ fontSize: '20px', color: 'black' }}>
            {test?.testName}
          </span>
        </div>

        <div className="get-test-detail-box white-space">
          <div
            className="light white-space"
            style={{ fontSize: '15px'}}
          >
            {test?.testDetail.replace(/\\n/g, '\n')}
            
          </div>
        </div>

        <Image
          className="test-img-2"
          src={`/s3/${test?.testImg2}`}
          alt={test?.testName || "기본 이미지 설명"}
          width={393}
          height={256}
          priority={true}
        />

        <div>
          <input id='user-code' type="text" placeholder="이름을 입력해주세요." style={{ textAlign: 'center', width: '300px', height: '30px', border: '1px solid #E0E0E0' }} />
          <br />
          <span id="name-warning" className="light" style={{ fontSize: '11px', color: 'red', display: showWarning ? 'block' : 'none' }}>
            이름을 입력해주세요 !</span>
        </div>

        <button className="btn-black" onClick={handleStartTest}>
          <span className="light" style={{ fontSize: '15px' }}>
            테스트 시작하기 !</span>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestComponent />
    </Suspense>
  );
}
