export interface PostType{
  comment: string;
  feelLike: number;
  emotions: string[];
  images: string[];
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}

export interface HomeworkType{
  title:string;
  descr:string;
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}
