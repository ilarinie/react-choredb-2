import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

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
