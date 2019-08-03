import { Tasks } from '../interfaces/Taks.interface';

export class TaskModel implements Tasks{

    public id: number;
    public title: string;
    public done: boolean;
    public priority: string;

    constructor( id: number, title: string, done = false, priority: string ){
        this.id = id;
        this.title = title;
        this.done = done;
        this.priority = priority;
    }
}
