class Node {
    constructor (key, value, nextNode = null) {
        this.key = key
        this.value = value
        this.nextNode = nextNode
    }
}


class HashMap {
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

    set(key, value) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }
        if (this.buckets[index] === null) {
            this.buckets[index] = new Node(key, value)
            this.size++
            return
        } else {
            let current = this.buckets[index]
            while (current !== null) {
                if (current.key === key) {
                    current.value = value
                    return
                } else {
                    current = current.nextNode
                }
            }
            this.buckets[index] = new Node(key, value, this.buckets[index])
            this.size++
        }
    }

    get(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds")
        }
        let current = this.buckets[index]
        while (current !== null) {
            if (current.key === key) {
                return current.value
            } else {
                current = current.nextNode
            }
        }
        return undefined
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

    values() {
        let valuesArray = []
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                let current = bucket
                while (current !== null) {
                    valuesArray.push(current.value)
                    current = current.nextNode
                }
            }
        }
        return valuesArray
    }
}