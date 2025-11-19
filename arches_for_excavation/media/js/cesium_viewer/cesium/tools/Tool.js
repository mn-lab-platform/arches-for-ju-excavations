export class Tool {
  constructor(widget, name, callbacks = {}) {
    this.widget = widget;
    this.name = name;
    this.callbacks = callbacks;
    this.active = false;
  }
  
  activate() {
    // To be implemented by subclasses, should set this.active = true
    throw new Error('activate() must be implemented by subclass');
  }

  deactivate() {
    // To be implemented by subclasses, should set this.active = false
    throw new Error('deactivate() must be implemented by subclass');
  }

  _triggerCallback(eventName, ...args) {
    if (this.callbacks[eventName]) {
      return this.callbacks[eventName](...args);
    }
  }
}
