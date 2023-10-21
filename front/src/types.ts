export interface PostType{
  comment: string;
  feelLike: number;
  emotions: string[];
  images: string[];
  homework: any;
  owner?: any;
  ACL?:any;
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}

export interface HomeworkType{
  title:string;
  descr:string;
  owner?: any;
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

export interface MsgType{
  message: string;
  sender: any;
  reciver: any;
}
