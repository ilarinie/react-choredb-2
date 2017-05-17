
const status = {
    logged_in: false,
    loading: false
};

const commune = {
    user: {},
    commune: {},
    chores: {},
    budget: {},
    purchases: {},
    status: {}
};


const initialState = {
    status: status,
    commune: commune
};



export function Reducer(state: any = initialState, action: any) {
    return state;
}

export default Reducer;