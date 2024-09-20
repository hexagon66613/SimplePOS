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

// Handle cash payment and print preview
document.getElementById('pay-cash').addEventListener('click', () => {
    if (totalAmount > 0) {
        printBill();
    } else {
        alert('No amount to pay.');
    }
});

// Print bill preview
function printBill() {
    const billWindow = window.open('', 'Print Bill', 'height=600,width=400');
    billWindow.document.write('<html><head><title>Bill</title><style>');
    billWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    billWindow.document.write('.item { display: flex; justify-content: space-between; }');
    billWindow.document.write('</style></head><body>');
    billWindow.document.write('<h2>Bill</h2>');
    selectedItems.forEach(item => {
        billWindow.document.write(`<div class="item">${item.name} x${item.quantity} - Rp${item.price * item.quantity}</div>`);
    });
    billWindow.document.write(`<h3>Total: Rp${totalAmount}</h3>`);
    billWindow.document.write('</body></html>');
    billWindow.document.close();
    billWindow.print();
}

// Navigate to Inventory Menu
document.getElementById('go-inventory').addEventListener('click', () => {
    window.location.href = 'inventory.html'; // Make sure you have this page created
});
