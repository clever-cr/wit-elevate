import { ReactNode } from "react";

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
}

export interface buttonProps {
  text: string;
  className?: string;
  textClass?: string;
  icon?: ReactNode;
}

export interface heroProps {
  image: string;
  title: string;
  description: string;
}

export interface blogPorps {
  picture: string;
  title: String;
  description: String;
  
}
