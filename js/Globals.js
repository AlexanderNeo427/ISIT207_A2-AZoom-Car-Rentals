'use strict'

const SECONDS_PER_HOUR = 60 * 60
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24

const LocalStorageKeys = {
    RESERVED_CAR_ID: "RESERVED_CAR_ID",
    PICKUP_DETAILS: "PICKUP_DETAILS", 
    RETURN_DETAILS: "RETURN_DETAILS",
    USER_ACCOUNTS: "USER_ACCOUNTS", 
    LOGGED_IN_USER_ID: "LOGGED_IN_USER_ID"
}

const Utils = {
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
    lerp(a, b, t) {
        return a * (1 - t) + b * t
    },
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    },
    durstenfeldShuffle(arr) {
        let array = [...arr]
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
}

function getDayString(day) {
    switch (day) {
        case 0: return "Sun"
        case 1: return "Mon"
        case 2: return "Tue"
        case 3: return "Wed"
        case 4: return "Thu"
        case 5: return "Fri"
        case 6: return "Sat"
    }
}

function getMonthString(month) {
    switch (month) {
        case 0: return "Jan"
        case 1: return "Feb"
        case 2: return "Mar"
        case 3: return "Apr"
        case 4: return "May"
        case 5: return "Jun"
        case 6: return "Jul"
        case 7: return "Aug"
        case 8: return "Sep"
        case 9: return "Oct"
        case 10: return "Nov"
        case 11: return "Dec"
    }
}

function customDateTimeFormat(datetime) {
    const meridiem = datetime.getHours() >= 12 ? "PM" : "AM"
    const hourDisplay = datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours()

    return `
        ${getDayString(datetime.getDay())},
        ${datetime.getDate().toString().padStart(2, 0)} 
        ${getMonthString(datetime.getMonth())},
        ${datetime.getFullYear()} | 
        ${hourDisplay.toString().padStart(2, 0)}:${datetime.getMinutes().toString().padStart(2, 0)}
        ${meridiem}
    `
}

