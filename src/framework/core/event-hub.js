export class EventHub {
  constructor() {
    this._handlers = {};
  }

  on(event, fn, target) {
    let handlers = this._handlers[event];
    if (handlers === undefined) {
      handlers = [];
      this._handlers[event] = handlers;
    }
    handlers.push({ fn, target });
  }

  offAll(target) {
    for (const handlers of Object.keys(this._handlers)) {
      this._handlers[handlers] = this._handlers[handlers]
        .filter(handler => handler.target !== target);
    }
  }
  
  off(fn) {
    for (const handlers of Object.keys(this._handlers)) {
      this._handlers[handlers] = this._handlers[handlers]
        .filter(handler => handler.fn !== fn);
    }
  }

  dispatch(event, args) {
    const handlers = this._handlers[event];
    if (handlers === undefined) return;
    for (const handler of handlers) {
      handler.fn(args);
    }
  }

  static dispatch(event, ...args) {
    EventHub.logic.dispatch(event, args);
    GameUI.dispatch(event, args);
  }

  static get stats() {
    // For debug/profiling purposes
    function countHandlers(eventHub) {
      return Object.values(eventHub._handlers)
        .map(handlers => handlers.length)
        .sum();
    }
    return `UI(UPDATE/Total): ${EventHub.ui._handlers[GAME_EVENT.UPDATE].length}/${countHandlers(EventHub.ui)}; ` +
      `Logic(Total): ${countHandlers(EventHub.logic)}`;
  }
}

EventHub.logic = new EventHub();
EventHub.ui = new EventHub();

export const GameUI = {
  events: [],
  flushPromise: undefined,
  dispatch(event, args) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    if (event !== GAME_EVENT.UPDATE) {
      this.events.push([event, args]);
    }
    if (this.flushPromise) return;
    this.flushPromise = Promise.resolve()
      .then(this.flushEvents.bind(this));
  },
  flushEvents() {
    this.flushPromise = undefined;
    for (const event of this.events) {
      EventHub.ui.dispatch(event[0], event[1]);
    }
    EventHub.ui.dispatch(GAME_EVENT.UPDATE);
    this.events = [];
  },
  update() {
    this.dispatch(GAME_EVENT.UPDATE);
  }
};

export const GAME_EVENT = {
  GAME_TICK_AFTER: "GAME_TICK_AFTER",
  UPDATE: "UPDATE",

  TAB_CHANGED: "TAB_CHANGED",
  ENTER_PRESSED: "ENTER_PRESSED",
  HIDE_TOOLTIP: "HIDE_TOOLTIP",
  
  AFTER_LOADING: "AFTER_LOADING",
  LAYER_UNLOCKED: "LAYER_UNLOCKED",
  PRESTIGE_RESET: "PRESTIGE_RESET",
  UPGRADE_BOUGHT: "UPGRADE_BOUGHT"
};