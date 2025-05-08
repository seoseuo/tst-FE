"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Test } from "../../types/test";


interface TestListProps {
    testList: Test[];
}

export default function TestList({ testList }: TestListProps) {
    const router = useRouter();
    //const FEURL = process.env.NEXT_PUBLIC_NEXT_URL;
    
    const handleTestClick = async (test: Test) => {        
        router.push(`/test?testId=${test.testId}`);
        
        // 추후 링크 공유 용
        localStorage.setItem('shareUrl', `https://tessbro.site/test?testId=${test.testId}`);        
    };

    return (
        <div className="test-list-container">
            {testList.map((test, index) => (
                <div
                    key={test.testId}
                    className="test-item"
                    onClick={() => handleTestClick(test)}
                >
                    <span className="light test-title" style={{ fontSize: '15px', color: '#888888' }}>
                        {test.testDes}
                    </span>
                    <br />
                    <span className="bold test-title" style={{ fontSize: '20px', color: 'black' }}>
                        {test.testName}
                    </span>
                    <br />
                    <Image
                        className="test-img-1"
                        src={`/s3/${test.testImg1}`}
                        alt={test.testName}
                        width={393}
                        height={207}
                        priority={true}
                    />
                    {index !== testList.length - 1 && (
                        <div style={{ marginTop: '23px', height: '2px', backgroundColor: '#E0E0E0' }} />
                    )}
                </div>
            ))}
        </div>
    );
}
