class Node {
    constructor(key, nextNode = null) {
        this.key = key
        this.nextNode = nextNode
    }
}


class HashSet {
    constructor() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.size = 0
        this.buckets = new Array(this.capacity).fill(null)
    }

    hash(key) {
        let hashCode = 0

        const primeNumber = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
        }
        return hashCode
    }

    set(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }
        let current = this.buckets[index]
        while (current !== null) {
            if (current.key === key) {
                return
            } else {
                current = current.nextNode
            }
        }    
        this.buckets[index] = new Node(key, this.buckets[index])
        this.size++
        if (this.size > this.capacity * this.loadFactor) {
            this.resize()
        }
    }

    has(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }
        let current = this.buckets[index]
        while (current !== null) {
            if (current.key === key) {
                return true
            } else {
                current = current.nextNode
            }
        }
        return false
    }

    remove(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }
        let current = this.buckets[index]
        if (current === null) {
            return false
        }
        if (current !== null && current.key === key) {
            this.buckets[index] = current.nextNode
            this.size--
            return true
        } else {
            let prev = current
            current = current.nextNode
            while (current !== null) {
                if (current.key === key) {
                    prev.nextNode = current.nextNode
                    this.size--
                    return true
                } else {
                    prev = prev.nextNode
                    current = current.nextNode
                }
            }
        }
        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.size = 0
        this.buckets = new Array(this.capacity).fill(null)
    }

    keys() {
        let keysArray = []
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                let current = bucket
                while (current !== null) {
                    keysArray.push(current.key)
                    current = current.nextNode
                }
            }
        }
        return keysArray
    }

    resize() {
        const oldKeys = this.keys()
        this.capacity *= 2
        this.buckets = new Array(this.capacity).fill(null)
        this.size = 0
        oldKeys.forEach((key) => {
            this.set(key)
        })
    }
}