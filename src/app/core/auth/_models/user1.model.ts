export class User1 {
	id: number;
	username: string;
	password: string;
	fullname: string;
	email: string;
	credentialID: number;
	credentialType?: string;
	roleId?: number;
	roleType?: string;
	isActive?: number
	accessToken?: string;
	refreshToken?: string;


	clear(): void {
		this.id = undefined;
		this.username = '';
		this.password = '';
		this.email = '';
		this.roleId = undefined;
		this.fullname = '';
		this.credentialID = undefined;
		this.roleType = '';
		this.accessToken = '';
		this.refreshToken = '';
	}
}
