const utils = {
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
}