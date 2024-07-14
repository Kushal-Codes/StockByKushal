let stocks = [];

// Function to calculate total profit or loss
function calculateTotalProfitOrLoss(stocks) {
    let totalProfitOrLoss = 0;
    let totalCurrentBalance = 0;

    stocks.forEach(stock => {
        let totalInitialInvestment = stock.purchasePrice * stock.numberOfStocks;
        let totalCurrentValue = stock.currentPrice * stock.numberOfStocks;
        let profitOrLoss = totalCurrentValue - totalInitialInvestment;
        totalProfitOrLoss += profitOrLoss;
        totalCurrentBalance += totalCurrentValue;

        // Add row to table
        addStockRow(stock, profitOrLoss);
    });

    return { totalProfitOrLoss, totalCurrentBalance };
}

// Function to add a row to the stocks table
function addStockRow(stock, profitOrLoss) {
    const tbody = document.getElementById("stocks-tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${stock.stockName}</td>
        <td>NPR ${stock.purchasePrice.toFixed(2)}</td>
        <td>${stock.numberOfStocks}</td>
        <td>NPR ${stock.currentPrice.toFixed(2)}</td>
        <td class="${profitOrLoss >= 0 ? 'profit' : 'loss'}">NPR ${profitOrLoss.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
}

// Function to handle form submission
document.getElementById("stock-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const stockName = document.getElementById("stockName").value;
    const ipoChecked = document.getElementById("ipo").checked;
    const purchasePrice = ipoChecked ? 100 : parseFloat(document.getElementById("purchasePrice").value);
    const numberOfStocks = parseInt(document.getElementById("numberOfStocks").value);
    const currentPrice = parseFloat(document.getElementById("currentPrice").value);

    const stock = { stockName, purchasePrice, numberOfStocks, currentPrice };
    stocks.push(stock);

    // Clear table body
    document.getElementById("stocks-tbody").innerHTML = '';

    // Calculate the total profit or loss and update the result div
    let { totalProfitOrLoss, totalCurrentBalance } = calculateTotalProfitOrLoss(stocks);
    const totalResultDiv = document.getElementById("total-result");

    if (totalProfitOrLoss > 0) {
        totalResultDiv.innerHTML = `<span class="profit">Total Profit: NPR ${totalProfitOrLoss.toFixed(2)}</span>`;
    } else if (totalProfitOrLoss < 0) {
        totalResultDiv.innerHTML = `<span class="loss">Total Loss: NPR ${Math.abs(totalProfitOrLoss).toFixed(2)}</span>`;
    } else {
        totalResultDiv.innerHTML = "No profit, no loss.";
    }

    // Update the total current balance div
    const totalBalanceDiv = document.getElementById("total-balance");
    totalBalanceDiv.innerHTML = `Total Current Balance: NPR ${totalCurrentBalance.toFixed(2)}`;

    // Clear form inputs
    document.getElementById("stock-form").reset();
});
