export class Speaker {
    id = this.json.id;
    name = this.json.name;
    photo: string;

    constructor(public json = {id: 0, name: ''}, photo = '') {
        this.photo = photo;
    }
}