import { Action } from '@ngrx/store';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SET_TARGET = 'SET_TARGET';
export const GET_MESSAGES = 'GET_MESSAGES';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export class SendMessage implements Action {

    readonly type = SEND_MESSAGE;

    constructor() { }

}

export class SetTarget implements Action {

    readonly type = SET_TARGET;

    constructor(public payload: any) { }

}

export class GetMessages implements Action {

    readonly type = GET_MESSAGES;

    constructor(public payload: { sender: number, destination: number, pw: string, isGroup: boolean }) { }
}


export class ClearMessages implements Action {

    readonly type = CLEAR_MESSAGES;

    constructor() { }
}

export class LoadMessages implements Action {

    readonly type = LOAD_MESSAGES;

    constructor(public payload: any[]) { }
}

export type MessengerActions = SendMessage | SetTarget | GetMessages | LoadMessages | ClearMessages;