"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectChoice, fetchQuestions } from "../../lib/api";
import Header from "../../component/main-header";
import { ShowQuestion } from "../../types/showQuestion";

export default function Home() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [showQuestion, setShowQuestion] = useState<ShowQuestion>();
    const [userCode, setUserCode] = useState<string>();
    const [testId, setTestId] = useState<number>();
    const [size, setSize] = useState<number>(2);

    useEffect(() => {
        const storedSize = localStorage.getItem("size");
        if (storedSize) {
            setSize(Number(storedSize));
        }
        const testId = localStorage.getItem("testId");
        if (testId) {
            setTestId(Number(testId));
        }
        const userCode = localStorage.getItem("userCode");
        if (userCode) {
            setUserCode(userCode);
        }

        const loadQuestions = async () => {            

            if (testId && userCode) {
                const data = await fetchQuestions(Number(testId), userCode, page);
                console.log("현재 질문 : ", data);
                setShowQuestion(data);
            }
        };

        loadQuestions();
    }, [page, size, router]);

    // 선택지 선택 시 호출되는 함수
    const selectHandler = async (styleId1: number, styleId2: number) => {
        if (!testId || !userCode || !showQuestion?.showQuestion.questionId) return;

        const data = {
            questionId: showQuestion.showQuestion.questionId,
            styleId1,
            styleId2,
            userCode,
        };

        try {
            await selectChoice(testId, data);

            // 마지막 페이지라면 page를 올리지 않고 즉시 스타일 페이지로 이동
            if (page >= size) {
                router.push("/style");
                return;
            }

            // 아닐 때만 page 증가
            setPage(page + 1);
        } catch (error) {
            console.error("선택지 선택 실패", error);
        }
    };


    return (
        <div>
            <Header text="" icon="logo" parent="/" />
            <div className="get-test-container">
                <div>
                    <span className="bold" style={{ fontSize: '20px' }}>
                        Q{page}.
                    </span>
                    <br />
                    <span className="thin" style={{ fontSize: '10px' }}>
                        {page}/{size}
                    </span>
                    <br />
                    <br />
                    <span className="regular" style={{ fontSize: '15px' }}>
                        {showQuestion?.showQuestion.questionContent}
                    </span>
                </div>
                <br />
                <br />

                {showQuestion?.choices.map((choice) => (
                    <button
                        key={choice.choiceId}
                        className="btn-white choice"
                        onClick={() => selectHandler(choice.styleId1, choice.styleId2)}
                    >
                        <span className="light" style={{ fontSize: '15px' }}>
                            {choice.choiceContent}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
