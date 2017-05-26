import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../App';
import {getMainState} from "./__mocks__/api_service";
import {Chores} from "../components/dashboard/chores/chores";
import {Budget} from "../components/dashboard/purchases/budget";
import {Dashboard} from "../components/dashboard/dashboard";
import {ChoreForm} from "../components/dashboard/chores/chore_form";
import {Login} from "../components/login/login";
import {UserList} from "../components/dashboard/admin_panel/users";
import {Profile} from "../components/dashboard/profile/profile";
import {AdminPanel} from "../components/dashboard/admin_panel/admin_panel";
import {PurchaseList} from "../components/dashboard/purchases/purchase_list";
import {NewPurchase} from "../components/dashboard/purchases/new_purchase";

;

declare var global: any;


const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

global.localStorage = localStorageMock;

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});


it('renders Chores', () => {
    getMainState((err, res) => {

        console.log(err);
        expect(TestUtils.createRenderer().render(
            <Chores mainState={res}/>
        )).toMatchSnapshot()
    });
})

it('renders Budget', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <Budget mainState={res}/>
        )).toMatchSnapshot()
    });
});

it('renders PurchaseList', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <PurchaseList user={res.current_user} purchases={res.purchases} />
        )).toMatchSnapshot()
    });
});

it('renders NewPurchase', () => {
        expect(TestUtils.createRenderer().render(
            <NewPurchase  />
        )).toMatchSnapshot();
});


it('renders Dashboard', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <Dashboard mainState={res}/>
        )).toMatchSnapshot()
    });
});

it('renders ChoreForm', () => {
    expect(TestUtils.createRenderer().render(
        <ChoreForm chore={{}}/>
    )).toMatchSnapshot()
});
it('renders ChoreForm with chore', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <ChoreForm chore={res.chores[0]}/>
        )).toMatchSnapshot()
    });
});

it('renders Login', () => {
    expect(TestUtils.createRenderer().render(
        <Login />
    )).toMatchSnapshot()
});

it('renders UserList', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <UserList mainState={res} />
        )).toMatchSnapshot()
    });
})

it('renders Menu', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <UserList mainState={res} />
        )).toMatchSnapshot()
    });
})

it('renders Profile', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <Profile mainState={res} />
        )).toMatchSnapshot()
    });
})

it('renders Admin Panel', () => {
    getMainState((err, res) => {
        expect(TestUtils.createRenderer().render(
            <AdminPanel mainState={res} />
        )).toMatchSnapshot()
    });
})