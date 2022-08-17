let amount = 0;
let months = 0;
let capital = 0;
let yearPercentage = 0;

let monthlyInterestRate = 0;
let monthlyPayment = 0;

function getUserInfo() {
    amount = parseFloat(document.getElementById('amountInput').value);
    months = parseInt(document.getElementById('monthInput').value)*12;
    capital = amount;
    yearPercentage = parseFloat(document.getElementById('yearPercentage').value);
    calculatedMonthlyPayment();
}

function calculatedMonthlyPayment(){
    monthlyInterestRate = yearPercentage / 100 / 12;
    monthlyPayment = (amount * monthlyInterestRate) / (1-(Math.pow((1+monthlyInterestRate),months*-1)));
    showOverview();
    getDetails();
}

function showOverview(){
    document.getElementById('overview').innerHTML = `
        <p>Paiement mensuel : ${monthlyPayment.toLocaleString('fr',
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
        </p>
        <p>Paiement annuel : ${(monthlyPayment *12).toLocaleString('fr',
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
        </p>
        <p>Total payé : ${(monthlyPayment *months).toLocaleString('fr',
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
        </p>
        <p>Total des intérêts payés : ${((monthlyPayment *months)-amount).toLocaleString('fr',
        {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
        </p>
`
}

function getDetails(){
    let information = "";
    let counter = 1;

    while(counter<=months){
        let paymentDate = new Date;
        paymentDate.setMonth(paymentDate.getMonth()+counter);
        let month = paymentDate.getMonth()+1;
        let year = paymentDate.getFullYear();
        let displayDate = `01/${month}/${year}`;
        if (month<10) {
            displayDate = `01/0${month}/${year}`
        } else {
            displayDate = `01/${month}/${year}`
        }

        let monthlyInterest = (capital * monthlyInterestRate);
        capital -=(monthlyPayment-monthlyInterest);

        information += `
        <tr>
            <td>${counter++}</td>
            <td>${displayDate}</td>
            <td>${(monthlyPayment-monthlyInterest).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>
            <td>${(monthlyInterest).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>
            <td>${(capital).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>
`
    }

    document.getElementById('details').innerHTML = information;

}