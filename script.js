let totalAmount = 0;
let inventory = {};

document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const unitPrice = parseFloat(document.getElementById('unit-price').value);

    const amount = quantity * unitPrice;
    totalAmount += amount;

    document.getElementById('total-display').innerText = `Total: Rp${totalAmount}`;
    document.getElementById('transaction-form').reset();
});

document.getElementById('pay-cash').addEventListener('click', () => {
    if (totalAmount > 0) {
        alert(`Paid in cash: Rp${totalAmount}`);
        totalAmount = 0;
        document.getElementById('total-display').innerText = 'Total: Rp0';
    } else {
        alert('No amount to pay.');
    }
});

// Inventory management
document.getElementById('inventory-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('inventory-item').value;
    const quantity = parseInt(document.getElementById('inventory-quantity').value);

    if (inventory[itemName]) {
        inventory[itemName] += quantity;
    } else {
        inventory[itemName] = quantity;
    }

    alert(`Added ${quantity} of ${itemName} to inventory. Current stock: ${inventory[itemName]}`);
    document.getElementById('inventory-form').reset();
});
