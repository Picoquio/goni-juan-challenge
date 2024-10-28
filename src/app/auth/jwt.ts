import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  roles: string[]; // Adjust according to your JWT structure
}

export function getRolesFromToken(token: string): string[] {
  if (!token) return [];

  const decoded: DecodedToken = jwtDecode(token);
  return decoded.roles || [];
}
