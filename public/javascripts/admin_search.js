function updateTable(input) {
    const table = document.querySelector('#data_table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    input = input.toLowerCase();
    rows.forEach((row) => {
        const name = row.cells[1].textContent.toLowerCase();
        const role = row.cells[2].textContent.toLowerCase();

        if (name.includes(input) || role.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    })
}

const input = document.querySelector('#form1');
input.addEventListener('input', function () {
    updateTable(input.value);
})
