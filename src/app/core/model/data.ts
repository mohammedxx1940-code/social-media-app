export interface IResponse {
  success: boolean
  message: string
  data: Data
  meta: Meta
}

export interface Data {
  posts: IPost[]
  users: IUser[]
}

export interface IPost {
  _id: string
  body?: string
  image?: string
  privacy: string
  user: IUser
  sharedPost?: IPost
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: IComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface IUser {
  _id: string
  name: string
  username?: string
  photo: string
  post : IPost[]
}

export interface IComment {
  _id: string
  content: string
  image?: string
  commentCreator: IUser
  post: string
  parentComment: any
  likes: string[]
  createdAt: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
  total: number
}

export interface IProfileResponse {
  success: boolean
  message: string
  data: {
    user: IUser
  }
}
export interface INotificationsResponse {
  success: boolean;
  message: string;
  data: {
    notifications: INotification[];
  };
  meta: {
    feedMode: string;
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
      nextPage: number;
    };
  };
}

export interface INotification {
  _id: string;
  recipient: INotificationUser;
  actor: INotificationUser;
  type: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: INotificationEntity;
}

export interface INotificationUser {
  _id: string;
  name: string;
  photo: string;
}

export interface INotificationEntity {
  _id: string;
  body: string;
  image?: string;
  user: string;
  commentsCount: number;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}