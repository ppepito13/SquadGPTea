export interface PostType{
  comment: string;
  feelLike: number;
  emotions: string[];
  images: string[];
  ACL?:any;
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

export interface UserType{
  username:string;
  type: string;
  therapist:UserType;
  createdAt?: Date;
  objectId: string;
  updatedAt?: Date;
}
