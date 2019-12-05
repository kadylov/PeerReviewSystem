import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User1 {
	ID: number;
	Username: string;
	Password: string;
	Email: string;
	Fullname: string;
	RoleId: number;

}
