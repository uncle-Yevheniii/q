export class UserInfoDto {
  id: number;
  username: string;
}

export class ExhibitDto {
  id: number;
  title: string;
  artist: string;
  description: string;
  createdAt: string;
  userInfo: UserInfoDto;
}

export class ExhibitResponseDto {
  data: ExhibitDto[];
  total: number;
}
