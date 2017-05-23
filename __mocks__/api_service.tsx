import * as fs from 'fs';


export const getMainState = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/main_state.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

export const getPurchases = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/purchases.json', 'utf8', (err, data) => {
       if (!err) {
           callBack(null, JSON.parse(data));
       } else {
           callBack(err, null);
       }
    });
}

export const getChores = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/chores.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

export const getCommune = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/commune.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

export const getUser = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/current_user.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

export const getUsers = (callBack: any) => {
    fs.readFile('./__mocks__/mock_data/commune_users.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

