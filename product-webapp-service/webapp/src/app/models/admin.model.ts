export class Admin {
    adminMail!: string;
    adminName!: string;
    adminProfilePic!: string;
    adminMobile!: string;

    Admin(adminMail: string, adminName: string, adminProfilePic: string, adminMobile: string) { 
        this.adminMail = adminMail;
        this.adminName = adminName;
        this.adminProfilePic = adminProfilePic;
        this.adminMobile = adminMobile;
    }

}