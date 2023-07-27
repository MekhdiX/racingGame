import { UserInfo } from 'api/types';

type ErrorFields = keyof Omit<Profile, 'avatar'>;

export type Profile = Partial<Omit<UserInfo, 'id' | 'password'>>;
export type ProfileErrors = Partial<Record<ErrorFields, boolean>>;
