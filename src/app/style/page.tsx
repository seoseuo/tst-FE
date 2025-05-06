"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchResult } from "../../lib/api";
import Header from "../../component/main-header";
import { Style } from "../../types/style";

export default function Home() {
    const router = useRouter();

    const [style, setStyle] = useState<Style | null>(null);
    const [shareUrl, setShareUrl] = useState("");
    const [showUserCode, setShowUserCode] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        const testId = localStorage.getItem("testId");
        const userCode = localStorage.getItem("userCode");
        const url = localStorage.getItem("shareUrl") || "";

        if (!testId || !userCode) {
            console.error("테스트 ID 또는 유저 코드가 없습니다.");
            return;
        }

        setShareUrl(url);

        const userName = userCode.replace(
            /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
            ""
        );
        setShowUserCode(userName);

        (async () => {
            try {
                const result = await fetchResult(Number(testId), userCode);
                setStyle(result);
            } catch (e) {
                console.error("스타일 결과 로드 실패:", e);
            }
        })();
    }, []);


    const handleShare = () => {
        if (!shareUrl) {
            alert("공유할 URL이 없습니다.");
            return;
        }

        // // Web Share API 지원 시
        // if (typeof navigator.share !== "undefined") {
        //     navigator
        //         .share({
        //             title: "테스트 결과 공유",
        //             text: "나의 테스트 결과를 공유해보세요!",
        //             url: shareUrl,
        //         })
        //         .catch((err) => {
        //             console.error("공유 실패:", err);
        //         });
        // } else {
        // Web Share API 미지원 → 클립보드 복사 + 모달

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                setToastVisible(true);
                setTimeout(() => setToastVisible(false), 1000);
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
                alert("공유 URL 복사에 실패했습니다.");
            });
        //}
    };

    return (
        <div className="relative">
            <Header text="" icon="logo" parent="/" />

            <div className="get-style-container">
                <div>
                    <span className="bold" style={{ fontSize: 20 }}>
                        {showUserCode}
                    </span>
                    <span className="medium" style={{ fontSize: 15, marginLeft: 4 }}>
                        님의 결과는
                    </span>
                </div>

                {style ? (
                    <Image
                        src={`/s3/${style.styleImg}`}
                        alt={style.styleId?.toString() ?? "스타일 이미지"}
                        width={393}
                        height={565}
                        priority
                    />
                ) : (
                    <p>스타일 정보를 불러오는 중...</p>
                )}

                <div style={{ marginTop: 12 }}>
                    <span className="light" style={{ fontSize: 12 }}>
                        화면을 꾹 누르면 저장할 수 있습니다.
                    </span>
                    <br />
                    <span className="light" style={{ fontSize: 12 }}>
                        PC 환경이라면 마우스 오른쪽 버튼 클릭!
                    </span>
                </div>

                <button
                    className="btn-black"
                    onClick={handleShare}
                    style={{ marginTop: 16 }}
                >
                    <span className="light" style={{ fontSize: 15 }}>
                        친구에게 테스트 공유하기
                    </span>
                </button>

                {/* 토스트 */}
                {toastVisible && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-black bg-opacity-80 text-white px-6 py-4 rounded-xl text-center pointer-events-none">
                            <span className="light" style={{ fontSize: 15 }}>
                                링크가 복사되었습니다!
                            </span>
                        </div>
                    </div>
                )}

                <button
                    className="btn-white"
                    onClick={() => router.push("/")}
                    style={{ marginTop: 8 }}
                >
                    <span className="light" style={{ fontSize: 15 }}>
                        다른 테스트 둘러보기
                    </span>
                </button>
            </div>

            <div style={{ marginTop: 23, height: 2, backgroundColor: "#E0E0E0" }} />



        </div>
    );
}
