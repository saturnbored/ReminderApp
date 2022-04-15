import Notifications from "./Notification.js";
import RemindersView from "./RemindersView.js";
import ReminderAPI from "./ReminderAPI.js";


let Reminders = ReminderAPI.getAllReminders();

const saveReminderBtn = document.querySelector('#save-reminder-btn');

const onSaveReminderClick = () => {
    const reminderContents = document.querySelectorAll('.notif-content');
    const reminderToBeSaved = {
        title: reminderContents[0].value.trim(),
        msg: reminderContents[1].value.trim()
    }
    const timeField = document.getElementById('time');
    const timeInput = String(timeField.value).split(':');
    timeInput.forEach((str, ind) => timeInput[ind] = parseInt(str));
    const setTime = {
        hours : timeInput[0],
        minutes : timeInput[1]
    };
    reminderContents[0].value = "";
    reminderContents[1].value = "";
    timeField.value = "";
    const currentTime = new Date();
    const interval = 60000 * (setTime.hours * 60 + setTime.minutes - currentTime.getHours() * 60 - currentTime.getMinutes()) - currentTime.getSeconds() * 1000;
    reminderToBeSaved.id = setTimeout(() => {
        notifs.showNotification(reminderToBeSaved);
    }, interval);
    ReminderAPI.saveReminder(reminderToBeSaved);
    refreshRemindersList();
}

const onNotificationClick = (reminderId) => {
    onReminderDelete(reminderId);
}

const onReminderDelete = (id) => {
    clearTimeout(id);
    ReminderAPI.deleteReminder(id);
    refreshRemindersList();
}

const refreshRemindersList = () => {
    Reminders = ReminderAPI.getAllReminders();
    view.updateReminderList(Reminders);
}

saveReminderBtn.addEventListener('click', onSaveReminderClick);

const notifs = new Notifications(onNotificationClick);

const view = new RemindersView(document.getElementsByClassName('reminder-list')[0], onReminderDelete);

view.updateReminderList(Reminders);


