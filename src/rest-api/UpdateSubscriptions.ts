export interface UpdateSubscriber {
  updateModel(): void;
}

/**
 * How often should this update if it's just sitting there?
 * Right now this will trigger every 30 secs, so your state
 * shouldn't be more than 30 secs old.
 *
 * Does decisions support web sockets?
 * if so none of this might be necessary :/
 */
const POLL_INTERVAL = 30000;

/**
 * A very naive / simplistic state update mechanism.
 *
 * In a real app, this would almost certainly be accomplished
 * by adding a real hooks via a real state management library,
 * such as redux, or more likely for something small like this,
 * Mobx, or at least using some other observable lib like RxJS,
 * but why add that bloat to this tiny little thing?
 *
 * At this point in a POC that's probably already late, it
 * makes sense to do this with as little rework as possible,
 * so here it is:
 */
export const UpdateSubscriptions = {
  interval: 0,
  removeSubscriber(key: string) {
    this.subscribers.delete(key);
  },
  addSubscriber(key: string, subscriber: UpdateSubscriber) {
    this.subscribers.set(key, subscriber);
  },
  subscribers: new Map<string, UpdateSubscriber>(),
  triggerUpdate() {
    this.subscribers.forEach(subscriber => subscriber.updateModel());
  }
};

/**
 * creates a simplistic polling mechanism for the app. :/
 */
UpdateSubscriptions.interval = window.setInterval(
  UpdateSubscriptions.triggerUpdate.bind(UpdateSubscriptions),
  POLL_INTERVAL
);
