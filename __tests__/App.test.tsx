import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/App';
import {getMainState} from "../__mocks__/api_service";
import {Chores} from "../src/components/dashboard/chores/chores";
import {Budget} from "../src/components/dashboard/purchases/budget";
import {Dashboard} from "../src/components/dashboard/dashboard";
import {ChoreForm} from "../src/components/dashboard/chores/chore_form";
import {Login} from "../src/components/login/login";
import {UserList} from "../src/components/dashboard/users";
import {Profile} from "../src/components/dashboard/profile/profile";


jest.mock(`../__mocks__/api_service.tsx`);

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