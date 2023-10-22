export interface PostType{
  comment: string;
  feelLike: number;
  emotions: string[];
  images: string[];
  records: string[];
  homework: any;
  sentiment: string;
  owner?: any;
  ACL?:any;
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}

export interface HomeworkType{
  title:string;
  descr:string;
  archived: boolean,
  rating: string,
  owner?: any;
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}

export interface UserType{
  username:string;
  type: string;
  therapist:UserType;
  parent:UserType;
  createdAt?: Date;
  objectId: string;
  updatedAt?: Date;
}

export interface MsgType{
  message: string;
  sender: any;
  reciver: any;
}
