const apiEndpoint = "http://localhost:4000";

const form = document.querySelector('.booking-form');
const searchInput = document.querySelector('#searchSlot');

const seatsAallocated = new Map();

let EditList;

let editObject = null;

let bookingCount = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleTicketBooking(event);
})

document.addEventListener('DOMContentLoaded', (event) => {
    handleLoadAllBookings(event);
})

searchInput.addEventListener('input', (event) => {
    let searchTimer;
    const value = event.target.value;

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
        handleSearchBooking(value);
    }, 400);
});

async function handleLoadAllBookings(event) {

    try {
        const response = await axios.get(apiEndpoint + "/ticket");
        console.log(response);
        if (response.status == 200 && response.data.length > 0) {
            const bookings = response.data;
            for (let booking of bookings) {
                seatsAallocated.set(booking.seatNo, booking);
                displayBookingRecord(booking);
            }
            addBookingToCount(bookings.length);
        } else {
            displayNoBookingFound();
        }

    } catch (err) {
        alert('Failed to load Booking list.');
        console.log(err);
    }


}

async function handleTicketBooking(event) {

    const name = event.target.name.value;
    const seatNo = event.target.seatNo.value;

    if (name == "") {
        alert('Name field required.');
        return;
    }

    if (seatNo == "") {
        alert('Seat number field is required.');
        return;
    }

    if (!isSeatAvailable(seatNo)) {
        alert('Seat already booked, try with another seat number.');
        return;
    }

    if(editObject) {
        handleUpdateBooking(name, seatNo);
        return;
    }

    try {
        const response = await axios.post(apiEndpoint + "/ticket", { name, seatNo });
        if (response.status == 201) {
            const booking = response.data;
            seatsAallocated.set(booking.seatNo, booking);
            form.reset();
            if(bookingCount == 0) {
                clearBookingList();
            }
            addBookingToCount();
            displayBookingRecord(booking);
            showSuccessPopup('Booking has been done successfully!');
        }

    } catch (err) {
        alert('Something went wrong, try after sometime.');
        console.log(err);
    }
}

async function handleUpdateBooking(name, seatNo) {

    try{
        const response = await axios.put(apiEndpoint + '/ticket/' + editObject._id, {name, seatNo});

        if(response && response.status == 200 || response.status == 204) {
            showSuccessPopup('Booking has been updated successfully!');
            handleUpdateList(name, seatNo);
        }
    }catch(err) {
        alert('Something went wrong, try after sometime.');
        console.log(err);
    }
}

async function handleDeleteBooking(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const bookingId = btn.getAttribute('booking-id');
    const seatNo = btn.getAttribute('booking-seat');

    if (bookingId) {
        try {
            const response = await axios.delete(apiEndpoint + "/ticket/" + bookingId);
            console.log(response);
            if (response.status == 204 || response.status == 200) {
                li.remove();
                form.reset();
                seatsAallocated.delete(seatNo);
                removeBookingFromCount();
                if(bookingCount == 0) {
                    displayNoBookingFound();
                }
                showSuccessPopup('Booking has been deleted successfully!');

            }
        } catch (err) {
            alert('Failed to delete booking, try again later.');
            console.log(err);
        }
    }
}

function handleSearchBooking(value) {

    const searchValue = value.trim().toLowerCase();

    if (value === '') {
        for (let booking of seatsAallocated.values()) {
            displayBookingRecord(booking);
        }
    }

    clearBookingList();

    let matchFound = false;
    for (let booking of seatsAallocated.values()) {
        const nameMatch = booking.name.toLowerCase().includes(searchValue);
        const seatMatch = booking.seatNo.toString().includes(searchValue);

        if (nameMatch || seatMatch) {
            matchFound = true;
            displayBookingRecord(booking);
        }
    }
    if (!matchFound) {
        displayNoBookingFound();
    }
}

async function handleEditBooking(event) {
    const editBtn = event.target;
    const li = editBtn.parentNode.parentNode;
    const bookingId = editBtn.getAttribute('booking-id');

    try{
        const response = await axios.get(apiEndpoint + '/ticket/' + bookingId);

        if(response && response.status == 200) {
            EditList = li;
            editObject = response.data;
            displayEditBooking(response.data);
        }
    }catch(err){
        console.log(err);
    }
}

//display function
function handleUpdateList(name, seatNo) {
    const nameDiv = EditList.querySelector('.name');
    const seatDiv = EditList.querySelector('.seatNo');

    nameDiv.textContent = name;
    seatDiv.textContent = seatNo;

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Submit';

    form.reset();
    editObject = {};
    EditList = {};
}

function displayEditBooking(booking) {
    const nameInput = document.querySelector('#name');
    const seatinput = document.querySelector('#seatNo');

    nameInput.value = booking.name;
    seatinput.value = booking.seatNo;

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Update';
}

function displayBookingRecord(booking) {
    const ul = document.querySelector('.booking-list');

    const li = document.createElement('li');
    li.classList.add('list-item');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = booking.name;
    li.appendChild(nameDiv);

    const seatDiv = document.createElement('div');
    seatDiv.classList.add('seatNo');
    seatDiv.textContent = booking.seatNo;
    li.appendChild(seatDiv);

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('actions');

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.classList.add('edit-btn');
    editBtn.setAttribute('booking-id', booking._id);
    editBtn.setAttribute('booking-seat', booking.seatNo);
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', (event) => {
        handleEditBooking(event);
    })
    actionDiv.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('booking-id', booking._id);
    deleteBtn.setAttribute('booking-seat', booking.seatNo);
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', (event) => {
        handleDeleteBooking(event);
    })
    actionDiv.appendChild(deleteBtn);

    li.appendChild(actionDiv);

    ul.appendChild(li);
}

function clearBookingList() {
    document.querySelector('.booking-list').innerHTML = "";
}

function displayNoBookingFound() {
    const ul = document.querySelector('.booking-list');

    const li = document.createElement('li');
    li.textContent = 'No bookings found.'
    li.style.textAlign = 'center';

    ul.appendChild(li);
}

// Helper functions

function isSeatAvailable(seatNo) {
    if (seatsAallocated.has(seatNo)) {
        if(editObject && editObject._id == seatsAallocated.get(seatNo)._id) {
            return true;
        }
        return false;
    }
    return true;
}

function addBookingToCount(incrementBy = 1) {
    bookingCount = bookingCount + incrementBy;
    const totalBooking = document.querySelector('#totalBooking');
    totalBooking.textContent = 'Total Booking : ' + bookingCount;
}

function removeBookingFromCount() {
    bookingCount--;
    const totalBooking = document.querySelector('#totalBooking');
    totalBooking.textContent = 'Total Booking : ' + bookingCount;
}

function showSuccessPopup(message) {
    const popup = document.querySelector('#successPopup');

    popup.textContent = message;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}