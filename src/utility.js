// utility
export default {

    // crea un id univoco
    index: Math.floor(Math.random() * 100),
    newId() {
        let newId = Math.random().toString(36).substring(2, 7) // stringa casuale
        this.index++;
        newId += this.index.toString(36)
        newId += "-" + Date.now().toString(36) // converte in base 36
        return newId;
    },

    // * --------------------
    // DATE
    daysOfWeekShort: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    daysOfWeek: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    monthNames: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],

    dateY(date) { return date.getFullYear().toString() },
    dateM(date) { return (date.getMonth() + 1).toString().padStart(2, '0') },
    dateD(date) { return date.getDate().toString().padStart(2, '0') },
    toHoursString(date) { return date.getHours().toString().padStart(2, '0') },
    toMinutesString(date) { return date.getMinutes().toString().padStart(2, '0') },

    toLocalISO(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return `${this.dateY(date)}-${this.dateM(date)}-${this.dateD(date)}T${this.toHoursString(date)}:${this.toMinutesString(date)}:00`;
    },

    dateToFormData(date = new Date()) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return `${this.dateY(date)}-${this.dateM(date)}-${this.dateD(date)}`;
    },

    dateToEasyRead(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toLocaleString().slice(0, 17);
    },

    toDayOfWeek(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return this.daysOfWeek[(date.getDay() + 6) % 7];
    },

    toTimeString(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toTimeString().slice(0, 5)
    },

    isToday(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    },
    isISODate(date) {
        const regexDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        return regexDate.test(date)
    },
    // * --------------------

    // TIME
    // Validatore stringa time
    isTime(time) {
        const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regexTime.test(time)
    },
    // * --------------------

    // trasforma un numero in prezzo
    numberToPrice(total) {
        return '€' + total.toFixed(2).replace('.', ',')
    },

    // Validatore email
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email)
    },
}
