export function createEvent() {
    let subscriptions = [];

    const subscribe = (callback) => {
        let index = subscriptions.push(callback) - 1;

        return () => {
            subscriptions[index] = undefined;
        }
    }

    const emit = (...args) => {
        subscriptions.forEach(subscription => {
            try {
                subscription(...args);
            } catch (error) {
                console.error(error);
            }
        })         
    }

    return [subscribe, emit]
}