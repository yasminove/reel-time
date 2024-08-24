import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

const appSettings = {
    databaseURL: "https://playground-1fa97-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

function deleteReels() {
    remove(referenceInDB)
    listEl.innerHTML = ''
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const referenceInDB = ref(database, 'reels')

const inputElement = document.getElementById('input-element')
const button = document.getElementById('btn-element')
const listEl = document.getElementById('list-element')

button.addEventListener('click', function () {
    if (inputElement.value.trim() !== '') {
        push(referenceInDB, inputElement.value)
        inputElement.value = ''
    } else {
        alert('Please enter a movie name')
    }
}) 

onValue(referenceInDB, function (snapshot) {
    listEl.innerHTML = ''
    const snapshotExists = snapshot.exists()
    if (snapshotExists) {
        const items = snapshot.val();
        for (let key in items) {
            const item = items[key];
            const li = document.createElement('li');
            li.innerHTML = `${item} <span class="delete-btn" data-key="${key}">x</span>`
            listEl.appendChild(li)
        }
    }

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemKey = this.getAttribute('data-key');
            const itemRef = ref(database, `reels/${itemKey}`)
            remove(itemRef)
        })
    })
})








