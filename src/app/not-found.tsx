"use client";

import React from "react";
import Image from "next/image";

const NotFound = () => {
    return (
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

            {/* <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={100}
            /> */}

            <Image
                src="/404.png"
                alt="404"
                width={393}
                height={200}
            />
            <span className="medium" style={{ fontSize: '20px' }}>
                아쉽지만 여긴 올 수 없다.</span>
            <span className="light" style={{ fontSize: '13px' }}>
                페이지를 찾을 수 없습니다.</span>
            <br />
            <br />
            <br />
            <br />
            <button
                className="btn-black"
                onClick={() => (window.location.href = "/")}
            >
                <span className="light" style={{ fontSize: '15px' }}>
                    홈으로</span>
            </button>
        </div>

    );
};

export default NotFound;
