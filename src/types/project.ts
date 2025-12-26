export type Category = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  banner: string;
  images: string[];
  tags: string[];
  challenge:string,
  solution:string,
  link:string,
  technologies: string[];
  year: number;
  role: string;
  category: {
    id: number;
    name: string;
  };
};
