"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';

// Header 컴포넌트
export default function Header({ text, icon, parent }: { text: string; icon: string, parent?: string }) {
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
        <span className="thin" onClick={handleClick}>테스형</span>
      </p>            
    </div>
  );
}