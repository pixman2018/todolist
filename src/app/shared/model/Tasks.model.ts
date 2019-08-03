import { Tasks } from '../interfaces/Taks.interface';

export class TaskModel implements Tasks{

    public id: number;
    public title: string;
    public done: boolean;

    constructor( id: number, title: string, done = false ){
        this.id = id;
        this.title = title;
        this.done = done;
    }
}
