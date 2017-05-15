import {Chore} from './chore';
import {Purchase} from './purchase';
import {User} from './user';

export class Commune {
    communeId : number;
    name: string;
    user: User[];
    chores: Chore[];
    purchases: Purchase[];
}