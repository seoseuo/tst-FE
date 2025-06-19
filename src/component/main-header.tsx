"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loginCheck } from '../lib/api';

// Header 컴포넌트
export default function Header({ text, icon, parent }: { text: string; icon: string, parent?: string }) {

  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    loginCheck().then((isLogin) => setIsLogin(isLogin));
  }, []);

  const router = useRouter();

  const handleClick = () => {
    if (parent) {
      router.push(parent);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <p className="header">
        <Image 
          src={`/${icon}.svg`} 
          alt="" 
          width={50} 
          height={50} 
          onClick={handleClick}          
        />
        <span className="medium">{text}</span>
        
        {isLogin ? (
          <span className="thin" onClick={handleClick}>내 정보</span>
        ) : (

          <span className="thin" style={{cursor: 'pointer'}} onClick={() => router.push('/login')}>로그인</span>
        )}
      </p>            
    </div>
  );
}