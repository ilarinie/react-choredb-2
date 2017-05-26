const fs = require('fs');


export const getMainState = (callBack: any) => {
    fs.readFile(__dirname + '/mock_data/main_state.json', 'utf8', (err, data) => {
        if (!err) {
            callBack(null, JSON.parse(data));
        } else {
            callBack(err, null);
        }
    });
}

it('' , () => {
    console.log('');
});