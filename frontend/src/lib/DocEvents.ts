type Callback = (event: Event)=>void;
interface AttachEvent {
    event: string;
    callbacks: Callback[];
    eventCallback: Callback;
}
const attachEvents: {[name: string]: AttachEvent} = {};
export class DocEvents {
    private events: string[] = [];
    private callbacks: Callback[] = [];

    private callListeners(e: Event, attachEvent: AttachEvent) {
        for (let i = 0; i < attachEvent.callbacks.length; i++) {
            const callback = attachEvent.callbacks[i];
            callback(e);
        }
    }

    addEvent(eventName: string, callback: (event: Event)=>void) {
        if (eventName && callback) {
            this.events.push(eventName);
            this.callbacks.push(callback);
            let attachEvent = attachEvents[eventName];
            if (!attachEvent) {
                attachEvent = attachEvents[eventName] = {
                    event: eventName,
                    callbacks: [],
                    eventCallback: null
                };
                attachEvent.eventCallback = e => this.callListeners(e, attachEvent);
                document.addEventListener(eventName, attachEvent.eventCallback);
            }
            attachEvent.callbacks.push(callback);
        }
        return this;
    }

    unmount() {
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            const callback = this.callbacks[i];
            const attachEvent = attachEvents[event];
            attachEvent.callbacks = attachEvent.callbacks.filter(cb => cb !== callback);
            if (attachEvent.callbacks.length == 0) {
                document.removeEventListener(this.events[i], this.callbacks[i]);
                attachEvents[event] = null;
            }
        }
    }
}