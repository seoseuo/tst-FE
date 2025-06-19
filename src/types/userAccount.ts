export interface UserAccount {
  userId: string;
  userEmail: string;
  userName: string;
  userJoinDate: string; // LocalDateTime을 string으로 매핑
  isDelete: number | null;
  loginType: string;
}
