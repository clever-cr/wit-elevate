import { ChangeEvent, ReactNode } from "react";

export interface eventProps {
  _id: string;
  picture: string;
  title: string;
  description: string;
  date: string;
  location: string;
  cost: string;
  organiser: string;
  author: string;
}

export interface linkProps {
  link: string;
  path: string;
}

export interface buttonProps {
  text: string;
  className?: string;
  textClass?: string;
  icon?: ReactNode;
  onClick?: any;
  type?: "button" | "submit" | "reset";
}

export interface heroProps {
  image: string;
  title: string;
  description: string;
}

export interface blogProps {
  picture?: string;
  title?: string;
  description?: string;
  _id?: number;
  createdAt?: string;
}
export interface commentProps {
  content: string;
  createdBy: any;
}
export interface testimonyProps {
  testimony: string;
  title: string;
  name: string;
}

export interface searchProps {
  placeholder: string;
  text: string;
}

export interface discoverProps {
  text: string;
}

export interface formProps {
  header: string;
}

export interface inputProps {
  placeholder: string;
  value: string;
  name: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface headerProps {
  path: string;
  link: string;
  text: string;
}

export interface formData {
  [key: string]: string;
}
