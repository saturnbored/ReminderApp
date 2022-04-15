export default class Notifications{
    constructor(onNotificationClick){
        if(Notification.permission !== 'granted'){
            Notification.requestPermission();
        }
        this.onNotificationClick = onNotificationClick;
    }

    showNotification = (reminder) => {
        const params = {
            body: reminder.msg
        }
        const notification = new Notification(reminder.title, params);
        notification.onclick = () => {
            this.onNotificationClick(reminder.id);
        }
    }
};