export interface filterUsersRequest {
  numberOfUsers: number;
  page: number;
  valueContains: string;
  ascending: boolean;
  orderBy: string;
}
