
class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);  
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    resize() {
        this.capacity *= 2;
        const newBuckets = Array(this.capacity).fill(null).map(() => []);

        this.buckets.forEach((bucket) => {
            bucket.forEach(([key, value]) => {
                const index = this.hash(key);
                newBuckets[index].push([key, value]);
            });
        });
        this.buckets = newBuckets;
    }

    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
          throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;
        if(this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keyArray = [];
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].length > 0) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    keyArray.push(this.buckets[i][j][0]);
                }
            }
        }
        return keyArray;
    }

    values() {
        const valuesArray = [];
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].length > 0) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    valuesArray.push(this.buckets[i][j][1]);
                }
            }
        }
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].length > 0) {
                for(let j = 0; j < this.buckets[i].length; j++) {
                    entriesArray.push(this.buckets[i][j]);
                }
            }
        }
        return entriesArray;
    }
}

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log("Current Hashmap buckets:");
test.buckets.forEach((bucket, index) => {
    if(bucket.length > 0) {
        console.log(`Bucket ${index}`, bucket);
    }
});
console.log("HashMap size:", test.size);
console.log("Bucket length:", test.buckets.length);
console.log("Load factor:", test.size / test.capacity);

test.set("hat", "teal");
console.log("Current Hashmap buckets:");
test.buckets.forEach((bucket, index) => {
    if(bucket.length > 0) {
        console.log(`Bucket ${index}`, bucket);
    }
});
console.log("HashMap size:", test.size);
console.log("Bucket length:", test.buckets.length);
console.log("Load factor:", test.size / test.capacity);

test.set("moon", "silver");
console.log("Current Hashmap buckets:");
test.buckets.forEach((bucket, index) => {
    if(bucket.length > 0) {
        console.log(`Bucket ${index}`, bucket);
    }
});
console.log("HashMap size:", test.size);
console.log("Bucket length:", test.buckets.length);
console.log("Load factor:", test.size / test.capacity);

//Test get & has
// console.log("Get test(pink):", test.get("kite"));
// console.log("Has test(T):", test.has("kite"));
// console.log("Has test(F):", test.has("unicorn"));

//Test remove
// console.log("Remove test(T):", test.remove("kite"));
// console.log("Remove test(F):", test.remove("unicorn"));
// console.log("Current Hashmap buckets:");
// test.buckets.forEach((bucket, index) => {
//     if(bucket.length > 0) {
//         console.log(`Bucket ${index}`, bucket);
//     }
// });
// console.log("HashMap size:", test.size);

//Test clear
// test.clear();
// console.log("Current Hashmap buckets:");
// test.buckets.forEach((bucket, index) => {
//     if(bucket.length > 0) {
//         console.log(`Bucket ${index}`, bucket);
//     }
// });

//Test keys, values, & entries
// console.log("Key array:", test.keys());
// console.log("Values array:", test.values());
// console.log("Entries array:", test.entries());