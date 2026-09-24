class HashMap {
    constructor() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.size = 0
        this.buckets = new Array().fill(null)
    }

    hash(key) {
        let hashCode = 0

        const primeNumber = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i)
        }
        return hashCode
    }
}