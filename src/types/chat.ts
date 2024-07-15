export interface Message {
  msg: string;
  clientOffset: string;
}

export type Dm = {
  msg: string;
  senderId: number;
  recipientId: number;
};

type DmPreviewUser = {
  name: string;
  preferredName: string | null;
};

export type DmPreview = {
  senderId: number;
  recipientId: number;
  msg: string;
  sender: DmPreviewUser;
  recipient: DmPreviewUser;
};

export type Buddy = {
  id: number;
  name: string;
  preferredName: string | null;
  googleId: string;
};
