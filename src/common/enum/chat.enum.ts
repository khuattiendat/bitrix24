export enum ChatRoomType {
  //direct | group | project'
  DIRECT = 'direct',
  GROUP = 'group',
  PROJECT = 'project',
}
export enum ChatRoomMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
}
export enum ChatMessageType {
  // text | file | system | reply
  TEXT = 'text',
  FILE = 'file',
  SYSTEM = 'system',
  REPLY = 'reply',
}
export enum ReactionType {
  //like | love | caree | haha | wow | sad | angry
  LIKE = 'like',
  LOVE = 'love',
  CARE = 'care',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}
