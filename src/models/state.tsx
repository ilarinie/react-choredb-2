import {Purchase} from "./purchase";
import {Chore} from "./chore";
import {User} from "./user";
import {Commune} from "./commune";


export class State {
    commune: Commune;
    commune_users: User[];
    current_user: User;
    chores: Chore[];
    purchases: Purchase[];
    loggedIn: boolean;
}