document.getElementById('donationForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        donationType: document.getElementById('donationType').value,
    };

    try {
        const response = await fetch('http://localhost:5000/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) alert('Donation submitted successfully');
    } catch (error) {
        console.error('Error:', error);
    }
});

window.onload = async () => {
    const donationsList = document.getElementById('donationsList');
    if (donationsList) {
        const response = await fetch('http://localhost:5000/donations');
        const donations = await response.json();
        donationsList.innerHTML = donations
            .map((donation) => `<p>${donation.name} donated ${donation.donationType}</p>`)
            .join('');
    }
};
