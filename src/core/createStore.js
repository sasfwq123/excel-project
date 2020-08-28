/* eslint-disable */
export class createStore {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: "__INIT__"});
        this.listeners = [];
        this.rootReducer = rootReducer;
    }

    subscribe(func) {
        this.listeners.push(func);
        return {
            unsubscribe() {
                this.listeners = this.listeners.filter(l => l !== func);
            }
        };
    }

    dispatch(action) {
        this.state = this.rootReducer(this.state, action);
        this.listeners.forEach(listeners => listeners(this.state));
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state));
    }
}




























