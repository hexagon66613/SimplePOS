let totalAmount = 0;

// Sample items for the cashier menu
const items = [
    { name: "Item A", price: 10000 },
    { name: "Item B", price: 20000 },
    { name: "Item C", price: 15000 },
    { name: "Item D", price: 30000 },
];

// Populate item buttons
const itemList = document.getElementById('item-list');
items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'item-button';
    button.innerText = `${item.name} - Rp${item.price}`;
    button.onclick = () => addItemToTransaction(item);
    itemList.appendChild(button);
});

// Add item to transaction
function addItemToTransaction(item) {
    totalAmount += item.price;
    document.getElementById('total-display').innerText = `Total: Rp${totalAmount}`;
}

// Handle cash payment
document.getElementById('pay-cash').addEventListener('click', () => {
    if (totalAmount > 0) {
        alert(`Paid in cash: Rp${totalAmount}`);
        totalAmount = 0;
        document.getElementById('total-display').innerText = 'Total: Rp0';
    } else {
        alert('No amount to pay.');
    }
});

// Navigate to Inventory Menu
document.getElementById('go-inventory').addEventListener('click', () => {
    window.location.href = 'inventory.html'; // Create this file separately
});
