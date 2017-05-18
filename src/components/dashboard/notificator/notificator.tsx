
import * as Rx from 'rx';

export var eventStream = new Rx.Subject();


export var updateMessage: any = (message) => {
    eventStream.onNext(message);
};

