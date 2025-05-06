import { SelectedUtil } from "../types/selectedUtil";


const BASE_URL = '/api/tests'; // next.config.js rewrites로 인해 실제로는 Spring Boot로 프록시됨

// 테스트 목록 조회
export async function fetchTestList() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error('테스트 목록 조회 실패');
  return res.json();
}

// 테스트 상세 정보 조회
export async function fetchTestDetail(testId:number) {
  const res = await fetch(`${BASE_URL}/${testId}`);
  if (!res.ok) throw new Error(`테스트 상세 정보 조회 실패 (testId: ${testId})`);
  return res.json();
}

// 테스트 시작
export async function startTest(testId :number , userCode : string) {
  const res = await fetch(`${BASE_URL}/${testId}/start?userCode=${userCode}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`테스트 시작 실패 (testId: ${testId})`);  
  return res.json();
}

// 질문 목록 조회
export async function fetchQuestions(testId : number, userCode : string, page : number) {
  const res = await fetch(`${BASE_URL}/${testId}/questions?userCode=${userCode}&page=${page}`);
  if (!res.ok) throw new Error(`질문 조회 실패 (testId: ${testId}, page: ${page})`);
  return res.json();
}


export async function selectChoice(testId: number, selectedUtil : SelectedUtil) {
  const res = await fetch(`${BASE_URL}/${testId}/questions/select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedUtil),
  });
  if (!res.ok) throw new Error(`선택지 선택 실패 (testId: ${testId})`);
}

// 결과 가져오기
export async function fetchResult(testId: number, userCode: string) {
  const res = await fetch(`${BASE_URL}/${testId}/style?userCode=${userCode}`);
  if (!res.ok) throw new Error(`결과 조회 실패 (testId: ${testId})`);
  return res.json();
}
