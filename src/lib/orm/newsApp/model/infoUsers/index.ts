export class InfoUsers {
  id?: number;
  userId: string;
  userName: string;
  email: string;
  created: Date;
  updated: Date;

  constructor(data: Partial<InfoUsers> = {}) {
    this.id = data.id;
    this.userId = data.userId || '';
    this.userName = data.userName || '';
    this.email = data.email || '';
    this.created = data.created || new Date();
    this.updated = data.updated || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      userName: this.userName,
      email: this.email,
      created: this.created,
      updated: this.updated
    };
  }
}