// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

class Hashmap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);  // ?? This line was given by chatGPT, but I don't understand it fully
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i) % this.capacity;
        }
        return hashCode;
    }
}