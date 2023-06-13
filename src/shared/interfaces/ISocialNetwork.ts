import { SocialNetworkType } from '../enums/socialNetworkType.enum';

export interface SocialNetwork {
  type: SocialNetworkType;
  link: string;
}
