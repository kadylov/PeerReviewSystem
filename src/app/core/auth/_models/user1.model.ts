export class User1 {
	id: number;
	username: string;
	password: string;
	email: string;
	fullname: string;
	accessToken?: string;
	refreshToken?: string;
	role: number;
	credentialID: number;

	clear(): void {
		this.id = undefined;
		this.username = '';
		this.password = '';
		this.email = '';
		this.role = undefined;
		this.fullname = '';
		this.accessToken = '';
		this.refreshToken = '';
	}
}
