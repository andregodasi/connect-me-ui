import { SocialNetworkType } from '../enums/socialNetworkType.enum';
import { Status } from '../enums/status.enum';
import { Knowledge } from './IKnowledge';
import { SocialNetwork } from './ISocialNetwork';

export interface User {
  uuid: string;
  name: string;
  email: string;
  nickname: string;
  status: Status;
  photoUrl: string;
  title: string;
  companyRole: string;
  companyName: string;
  degree: string;
  aboutMe: string;
  socialNetworks?: SocialNetwork[];
  knowledge?: Knowledge[];
}

export interface ProfileForm {
  uuid: string;
  name: string;
  nickname: string;
  status: Status;
  title?: string;
  companyRole?: string;
  companyName?: string;
  degree?: string;
  aboutMe?: string;
  linkedIn?: string;
  gitHub?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  knowledge?: Knowledge[];
}

export interface ProfilePayload {
  name: string;
  nickname: string;
  status: Status;
  title?: string;
  companyRole?: string;
  companyName?: string;
  degree?: string;
  aboutMe?: string;
  knowledge?: Knowledge[];
  socialNetworks?: SocialNetwork[];
}

export const userDataToProfileForm = (user: User): ProfileForm => {
  return {
    uuid: user.uuid,
    name: user.name,
    nickname: user.nickname,
    status: user.status,
    title: user.title,
    companyRole: user.companyRole,
    companyName: user.companyName,
    degree: user.degree,
    aboutMe: user.aboutMe,
    linkedIn:
      user.socialNetworks?.find((sn) => sn.type === SocialNetworkType.LINKEDIN)
        ?.link || '',
    gitHub:
      user.socialNetworks?.find((sn) => sn.type === SocialNetworkType.GITHUB)
        ?.link || '',
    twitter:
      user.socialNetworks?.find((sn) => sn.type === SocialNetworkType.TWITTER)
        ?.link || '',
    instagram:
      user.socialNetworks?.find((sn) => sn.type === SocialNetworkType.INSTAGRAM)
        ?.link || '',
    facebook:
      user.socialNetworks?.find((sn) => sn.type === SocialNetworkType.FACEBOOK)
        ?.link || '',
    knowledge: user.knowledge,
  };
};

export const profileFromToPayload = (
  profileForm: ProfileForm,
): ProfilePayload => {
  return {
    name: profileForm.name,
    nickname: profileForm.nickname,
    status: profileForm.status,
    title: profileForm.title,
    companyRole: profileForm.companyRole,
    companyName: profileForm.companyName,
    degree: profileForm.degree,
    aboutMe: profileForm.aboutMe,
    socialNetworks: [
      { type: SocialNetworkType.LINKEDIN, link: profileForm.linkedIn || '' },
      { type: SocialNetworkType.GITHUB, link: profileForm.gitHub || '' },
      { type: SocialNetworkType.TWITTER, link: profileForm.twitter || '' },
      { type: SocialNetworkType.INSTAGRAM, link: profileForm.instagram || '' },
      { type: SocialNetworkType.FACEBOOK, link: profileForm.facebook || '' },
    ],
    knowledge: profileForm.knowledge,
  };
};

export interface Profile extends User {}
