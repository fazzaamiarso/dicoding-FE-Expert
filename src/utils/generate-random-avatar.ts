import { USER_AVATAR_URL } from "@/constants";

export const generateRandomAvatar = (seed: string) => `${USER_AVATAR_URL}?seed=${seed}`;
