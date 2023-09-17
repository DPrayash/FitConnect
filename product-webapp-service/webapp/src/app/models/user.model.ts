export interface User {
  userEmail: string;
  userPassword: string;
  userName: string;
  userAge: number;
  userMobile: string;
  userProfilePicUrl: string;
  height: number;
  weight: number;
  planName: string | null;
  planPrice: number | null;
  planDuration: string | null;
  expirationDate: Date | null;
}
