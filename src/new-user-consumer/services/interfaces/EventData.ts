interface UserData {
  name: string;
  email: string;
  picture: string;
  sub: string;
  userRole: string;
  iat: number;
  exp: number;
  jti: string;
}

interface EventData {
  user: UserData;
  eventName: string;
  timestamp: number;
}
 