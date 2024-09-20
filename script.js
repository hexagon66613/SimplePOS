let totalAmount = 0;
let selectedItems = [];

// Sample items for the cashier menu
const items = [
    { name: "Item A", price: 30000 },
    { name: "Item B", price: 40000 },
    { name: "Item C", price: 15000 },
    { name: "Item D", price: 25000 },
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
    const existingItem = selectedItems.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        selectedItems.push({ ...item, quantity: 1 });
    }
    updateItemsDisplay();
}

// Update the display of selected items
function updateItemsDisplay() {
    const itemsDisplay = document.getElementById('items-display');
    itemsDisplay.innerHTML = ''; // Clear current display

    selectedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'selected-item';
        itemDiv.innerText = `${item.name} x${item.quantity} - Rp${item.price * item.quantity}`;
        itemsDisplay.appendChild(itemDiv);
    });

    totalAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('total-display').innerText = `Total: Rp${totalAmount}`;
}

// Handle cash payment and show bill modal
document.getElementById('pay-cash').addEventListener('click', () => {
    if (totalAmount > 0) {
        showBill();
    } else {
        alert('No amount to pay.');
    }
});

// Show the bill in a modal
function showBill() {
    const billItems = document.getElementById('bill-items');
    billItems.innerHTML = ''; // Clear current bill display
    selectedItems.forEach(item => {
        billItems.innerHTML += `<div class="item">${item.name} x${item.quantity} - Rp${item.price * item.quantity}</div>`;
    });
    document.getElementById('bill-total').innerText = `Total: Rp${totalAmount}`;
    document.getElementById('bill-modal').style.display = 'block';
}

// Close the modal
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('bill-modal').style.display = 'none';
});

// Print the bill
document.getElementById('print-bill').addEventListener('click', () => {
    const billContent = document.getElementById('bill-modal').innerHTML;
    const printWindow = window.open('', 'Print Bill', 'height=600,width=400');
    printWindow.document.write('<html><head><title>Bill</title><style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('.item { margin: 5px 0; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Done button to finish transaction
document.getElementById('done-transaction').addEventListener('click', () => {
    alert('Transaction completed!');
    // Clear selected items and total
    selectedItems = [];
    totalAmount = 0;
    updateItemsDisplay();
    document.getElementById('bill-modal').style.display = 'none';
});

// Navigate to Inventory Menu
document.getElementById('go-inventory').addEventListener('click', () => {
    window.location.href = 'inventory.html'; // Make sure you have this page created
});
