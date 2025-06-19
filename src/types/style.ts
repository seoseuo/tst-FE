import { Test } from "./test";

export interface Style {
  styleId: number;
  testDTO: Test; // TestDTO에 해당하는 타입을 Test로 가정 (import 필요)
  styleName: string;
  styleContent: string;
  styleImg: string;
  isDelete: number;
}
