"use client";

import React from "react";
import Image from "next/image";
import Header from "../../component/main-header";

export default function Home() {

  // naver
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
  const naverRedirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!);
  const naverState = process.env.NEXT_PUBLIC_NAVER_STATE!;

  //kakao
  const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const kakaoRedirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!);
  const kakaoState = process.env.NEXT_PUBLIC_KAKAO_STATE!;

  // 네이버 로그인 URL
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&state=${naverState}`;

  // 카카오 로그인 URL
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&state=${kakaoState}`;
  

  return (
    <div>
      <Header text="" icon="back" parent="/" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center'
        }}
      >

        <Image
          src="/logo.svg" // 로고 이미지로 변경
          alt="Logo"
          width={350}
          height={200}
        />

        <span className="light" style={{ fontSize: '20px', marginTop: '20px' }}>
          테스형</span>
        <br />

        <span className="light" style={{ fontSize: '15px', marginTop: '10px' }}>
          자기사유 테스트 플랫폼 테스형</span>

        <hr style={{ width: '100%', marginTop: '20px' }} />

        <span className="light" style={{ fontSize: '15px', marginTop: '10px' }}>
          로그인 하고 AI와 함께 나만의 테스트 만들기 !</span>

        {/* 네이버 로그인 버튼 */}
        <a
          href={naverLoginUrl}
          style={{ marginTop: '30px' }}
        >
          <Image
            src="/naverlogin.png"
            alt="네이버 로그인"
            width={250}
            height={60}
          />
        </a>

        {/* 카카오 로그인 버튼 */}
        <a
          href={kakaoLoginUrl}
          style={{ marginTop: '10px' }}
        >
          <Image
            src="/kakaologin.png"
            alt="카카오 로그인"
            width={250}
            height={60}
          />
        </a>

      </div>
    </div>
  );
};
