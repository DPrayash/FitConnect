export class Admin {
    userEmail!: string;
    userName!: string;
    userProfilePicUrl!: string;

    Admin(userEmail: string, userName: string, userProfilePicUrl: string) { 
        this.userEmail = userEmail;
        this.userName = userName;
        this.userProfilePicUrl = userProfilePicUrl;
    }

}