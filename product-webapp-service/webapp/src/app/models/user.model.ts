export interface User {
  userEmail: string;
  userPasswordHash: string;
  userName: string;
  userAge: number;
  userMobile: string;
  userProfilePicUrl: string;
  height: string;
  weight: number;
  planName: string | null;
  planPrice: number | null;
  planDuration: string | null;
  expirationDate: Date | null;
}
