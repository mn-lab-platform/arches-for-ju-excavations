class EventBus {
    constructor() {
        this.subscriptions = {};
    }

    subscribe(eventType, callback) {
        const id = this._generateUniqueId();
        if(!this.subscriptions[eventType]) {
            this.subscriptions[eventType] = { };
        }
        this.subscriptions[eventType][id] = callback;

        //TODO: actually use the cleanup in subscribers
        return {
            unsubscribe: () => {
                delete this.subscriptions[eventType][id];
                if(Object.keys(this.subscriptions[eventType]).length === 0) {
                    delete this.subscriptions[eventType];
                }
            }
        }
    }

    publish(eventType, data) {
        if(!this.subscriptions[eventType]) {
            return;
        }
        Object.keys(this.subscriptions[eventType]).forEach(key => this.subscriptions[eventType][key](data))
    }

    _generateUniqueId() {
        return '_' + Math.random().toString(16).slice(2);
    }
}

export const EventBusInstance = new EventBus();