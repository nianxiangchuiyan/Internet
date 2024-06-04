document.addEventListener('DOMContentLoaded', function() {
    setMinDateTime();
    setInterval(setMinDateTime, 60000);  // Update minimum time every minute to keep it current
});
const parser = new DOMParser();
const xmlDoc = parser.parseFromString('./rooms.xml', "application/xml");
let rooms = {
    1: { isBooked: xmlDoc.getElementsByTagName("isbooked")[0], capacity: getData('room1','capacity'), price: getData('room1','price'),image: getData('room1','image') },
    2: { isBooked: false, capacity: getData('room2','capacity'), price: 40 },
    3: { isBooked: false, capacity: 4, price: 60 },
    4: { isBooked: true, capacity: 4, price: 60 },
    5: { isBooked: false, capacity: 6, price: 80},
    6: { isBooked: false, capacity: 8, price: 100 }
    
};

console.log(rooms);
for (let i = 1; i <= 10; i++) {
    let room = document.getElementById(`room${i}`);
    let image = $(`#image${i}`);
    
    room.addEventListener('mouseover', function() {
        image.css('display', 'block');
        var number=0;
        switch (i) {
            case 1:
            case 2: 
            case 3:
            case 4: 
            case 5:
                number = 2   
                break;
            
            case 6:
            case 7: number = 4   
                break;
            
            case 8:
            case 9: number = 6   
                break;
            
            case 10: number = 8   
                        break;
            
        
            default: number = -1
                break;
        }
        document.getElementById('showcapacity').innerText = "This room's capacity is:"+number;
    });

    room.addEventListener('mouseout', function() {
        image.css('display', 'none');
        document.getElementById('showcapacity').innerText = "";   
    });
    
    
}


document.querySelectorAll('.room').forEach(room => {


    room.addEventListener('click', function() {
        const roomId = this.id.replace('room', '');
        showDescription(roomId);
        selectRoom(roomId);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const roomData = {
        1: { isBooked: true, capacity: 2, price: 40 },
        2: { isBooked: false, capacity: 2, price: 40 },
        3: { isBooked: false, capacity: 4, price: 60 },
        4: { isBooked: true, capacity: 4, price: 60 },
        5: { isBooked: false, capacity: 6, price: 80},
        6: { isBooked: false, capacity: 8, price: 100 }
    };

    function updateRoomStyles() {
        Object.keys(roomData).forEach(key => {
            const room = roomData[key];
            const roomElement = document.getElementById(`room${key}`);
            roomElement.style.outline = room.isBooked ? '3px solid red' : '3px solid green';
        });
    }

    updateRoomStyles();
});


function getMinDateTime() {
    var now = new Date();
    var dateString = now.toISOString().substring(0, 16); // Gets the current date and time in YYYY-MM-DDTHH:MM format
    console.log("Current DateTime: ", now);
    console.log("ISO String Format: ", dateString);
    return dateString;
}

function setMinDateTime() {
    var dateString = getMinDateTime();
    var checkInInput = document.getElementById('checkIn');
    var checkOutInput = document.getElementById('checkOut');

    if (!checkInInput.value || new Date(checkInInput.value) < new Date()) {
        checkInInput.value = '';
        checkInInput.min = dateString;
    }

    if (!checkOutInput.value || new Date(checkOutInput.value) < new Date()) {
        checkOutInput.value = '';
        checkOutInput.min = dateString;
    }
}
function createContent(roomid) {
    console.log("Creating content for room:", roomid); // Check if function is called
    // Create a container for the rectangle
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.border = '2px solid black'; // Style for the rectangle
    container.style.padding = '10px';
    container.style.display = 'inline-block';
    container.style.backgroundColor = 'white'; // Add background color for visibility
    container.style.zIndex = '1000'; // Ensure it's on top

    const image = document.createElement('img');
    image.src = roomid+'.PNG';
    image.alt = 'Display Image';
    image.style.width = '100px'; // Adjust the size as needed
    image.style.height = '100px';
    // Create the image element
    var descriptions = {
        1: "Room 1: A single room with beautiful views of the garden.",
        2: "Room 2: Perfect for couples, features a double bed.",
        3: "Room 3: Spacious room suitable for up to three people.",
        4: "Room 4: Family room with four beds and a private balcony.",
        5: "Room 5: Penthouse suite with top amenities for luxury stays.",
        6: "Room 6: Penthouse suite with top amenities for luxury stays."
    };

    // Create the text element
    const text = document.createElement('p');
    text.textContent =descriptions[roomid] ;
    text.style.position = 'absolute';
    text.style.bottom = '5px';
    text.style.width = '100%';
    text.style.textAlign = 'center';

    // Append the image and text to the rectangle
    container.appendChild(image);
    container.appendChild(text);

    // Append the rectangle to the body or a specific element
    document.body.appendChild(container);
    console.log("Creating content for room:", roomid); // Check if function is called
}

function showDescription(roomNumber) {
    var descriptions = {
        1: "Room 1: A single room with beautiful views of the garden.",
        2: "Room 2: Perfect for couples, features a double bed.",
        3: "Room 3: Spacious room suitable for up to three people.",
        4: "Room 4: Family room with four beds and a private balcony.",
        5: "Room 5: Penthouse suite with top amenities for luxury stays.",
        6: "Room 6: Penthouse suite with top amenities for luxury stays."
    };
    document.getElementById('roomDescription').innerText = descriptions[roomNumber];
}
function selectRoom(roomNumber) {
    let numberOfPeople = parseInt(document.getElementById('capacity').value);
    let room = rooms[roomNumber];

    if (room.isBooked) {
        alert('Room ' + roomNumber + ' is already booked.');
    } else if (numberOfPeople > room.capacity) {
        alert('Room ' + roomNumber + ' cannot accommodate ' + numberOfPeople + ' people.');
    } else {
        alert('Room ' + roomNumber + ' selected for ' + numberOfPeople + ' people!');
        selectedRoom = roomNumber; // Store the selected room number
        document.getElementById('confirmButton').disabled = false; // Enable the confirm button
    }
}

document.getElementById('checkIn').addEventListener('change', validateDateTime);
document.getElementById('checkOut').addEventListener('change', validateDateTime);

function validateDateTime() {
    var input = this;
    const dateValue = new Date(input.value);
    const now = new Date();
    if (dateValue < now) {
        console.log("Selected date is in the past: ", dateValue < now);
        alert('You cannot select a past date or time.');
        input.value = "";  // Reset to current time if past time selected
    }
    if (input.id === 'checkIn' || input.id === 'checkOut') {
        var checkInInput = document.getElementById('checkIn');
        var checkOutInput = document.getElementById('checkOut');
        if (checkInInput.value && checkOutInput.value) {
            var checkInDate = new Date(checkInInput.value);
            var checkOutDate = new Date(checkOutInput.value);
            var timeDiff = checkOutDate - checkInDate;

            // Ensure check-out is after check-in
            var minCheckOutDate = new Date(checkInDate.getTime() + (24 * 60 * 60 * 1000));
            checkOutInput.min = minCheckOutDate.toISOString().substring(0, 16);

            if (checkOutDate < minCheckOutDate) {
                checkOutInput.value = "";
                alert('The check out time must be later than check in time. \n Hint: Booking less than one day will be counted as one full day of charges ');  
            }
             // Check if the check-out time is less than 24 hours after check-in
            if (timeDiff < 24 * 60 * 60 * 1000) {
                alert('Check-out time is less than 24 hours from check-in. This will be counted as one full day of charges.');
            }
        }
    }
}
async function fetchAndParseXML(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return parseRoomDetails(data);  // This assumes parseRoomDetails is correctly set up as shown earlier
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return {};  // Return an empty object on error to simplify error handling downstream
    }
}



function parseRoomDetails(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");
    const rooms = xmlDoc.querySelectorAll("Room > *");
    const roomDetails = {};

    rooms.forEach(room => {
        const roomNumber = room.tagName;
        roomDetails[roomNumber] = {
            isBooked: room.querySelector("isbooked").textContent === 'true',
            capacity: parseInt(room.querySelector("capacity").textContent, 10),
            price: parseFloat(room.querySelector("price").textContent),
            image: room.querySelector("image").textContent
        };
    });

    return roomDetails;
}

async function getData(room, data) {
    const roomData = await fetchAndParseXML('./rooms.xml');
    if (roomData[room] && roomData[room][data] !== undefined) {
        var data = await roomData[room][data];
        return data;
    } else {
        throw new Error(`Data not found for room ${room} or attribute ${data}`);
    }
}
