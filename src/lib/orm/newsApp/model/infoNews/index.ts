export class InfoNews {
  id?: number;
  title: string;
  author: string;
  createdTime: Date;
  content: string;
  created: Date;
  updated: Date;

  constructor(data: Partial<InfoNews> = {}) {
    this.id = data.id;
    this.title = data.title || '';
    this.author = data.author || '';
    this.createdTime = data.createdTime || new Date();
    this.content = data.content || '';
    this.created = data.created || new Date();
    this.updated = data.updated || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      createdTime: this.createdTime,
      content: this.content,
      created: this.created,
      updated: this.updated
    };
  }
}