import {Commune} from './commune';
import {User} from './user';

export class RootState {

    loggedIn : boolean;
    commune : Commune;
    user: User;
    
    constructor() {
        this.loggedIn = false;
        this.commune = new Commune();
        this.user = new User();
    }

}