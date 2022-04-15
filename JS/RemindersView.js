export default class RemindersView{
    constructor(root, onReminderDelete){
        this.root = root;
        this.onReminderDelete = onReminderDelete;
    }

    #createListItem = (reminder) => {
        const {title, msg, id} = reminder;
        return `
            <div class = 'reminder-list-item' data-reminder-id = ${id}>
                <h2>${title}</h2>
                <h4>${msg}</h4>
            </div>
        `
    }

    updateReminderList = (reminders) => {
        this.root.innerHTML = "";
        reminders.forEach(element => {
            this.root.innerHTML += this.#createListItem(element);
        });
        this.root.querySelectorAll('.reminder-list-item').forEach((item) => {
            item.addEventListener('dblclick', () => {
                const deleteConfirmation = confirm("Do you want to delete this reminder?");
                if(deleteConfirmation)
                    this.onReminderDelete(item.dataset.reminderId);
            });
        });
    }
};