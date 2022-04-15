export default class ReminderAPI{

    static getAllReminders = () => {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        return reminders;        
    }
    
    static saveReminder = (reminderToBeSaved) => {
        let reminders = this.getAllReminders();
        reminders.push(reminderToBeSaved);
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }
    
    static deleteReminder = (id) => {
        let reminders = this.getAllReminders();
        reminders.splice(reminders.findIndex(item => item.id === id), 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }
};