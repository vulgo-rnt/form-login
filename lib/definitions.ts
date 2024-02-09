import { ReactNode } from "react";

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type ChildrenProps = {
  children : ReactNode | ReactNode[] | string
}