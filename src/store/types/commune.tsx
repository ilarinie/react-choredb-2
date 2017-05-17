import {Chore} from "./chore";
import {BudgetItem} from "./budget_item";
import {Purchase} from "./purchase";
import {User} from "./user";

export class Commune {
    commune_id :number;
    name: string;
    chores: Chore[];
    budget: BudgetItem[];
    purchase: Purchase[];
    user: User;
}