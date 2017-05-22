import {Task} from "./task";

export class Chore {
    chore_id: number;
    name: string;
    priority: number;
    points: number;
    tasks: Task[];
}