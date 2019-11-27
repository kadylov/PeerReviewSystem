import {BaseModel} from "../../_base/crud";

export class User1 extends BaseModel{
	ID: number;
	Username: string;
	Password: string;
	Email: string;
	Fullname: string;
	RoleId: number;

	accessToken?: string;
	refreshToken?: string;

	clear(): void {
		this.ID = undefined;
		this.Username = '';
		this.Password = '';
		this.Email = '';
		this.Fullname='';
		this.RoleId=undefined;

		this.accessToken = 'access-token-' + Math.random();
		this.refreshToken = 'access-token-' + Math.random();
	}
}
