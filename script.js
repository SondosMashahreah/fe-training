function updateDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    document.getElementById("datetime").textContent =
        `© Date: ${year}-${month}-${day} Time: ${hours}:${minutes} My Bio. All rights reserved.`;
}

updateDateTime();
setInterval(updateDateTime, 60000);


document.getElementById("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    let contactData =
        JSON.parse(localStorage.getItem("contactData")) || [];

    contactData.push(contact);

    localStorage.setItem("contactData", JSON.stringify(contactData));

    alert("Thank you for your message!");

    this.reset();
});


function displayContactData() {

    let contactData =
        JSON.parse(localStorage.getItem("contactData")) || [];

    let output = "";

    contactData.forEach(function(contact) {

        output += `
            <p>Name: ${contact.name}</p>
            <p>Email: ${contact.email}</p>
            <p>Message: ${contact.message}</p>
            <hr>
        `;
    });
};