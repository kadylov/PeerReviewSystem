import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

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

}
