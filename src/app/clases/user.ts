export class User {
    public id: number;
    public userId: string;
    public title: string;
    public body: string;
    constructor(id: number, userId: string, title: string, body: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

}
