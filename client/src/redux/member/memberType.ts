import { AxiosResponseError } from "~/shared/types";

export type MemberType = any

export type InitialState = {
  member: any
  userList: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
};
