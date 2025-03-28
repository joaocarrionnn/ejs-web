// Função para adicionar um novo usuário na tabela
function addRow() {
    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;

    // Verifica se os campos não estão vazios
    if (nome && email) {
        const table = document.getElementById('tbalimentar');
        const newRow = table.insertRow();

        // Cria as células da nova linha
        newRow.innerHTML = `
            <td>${table.rows.length}</td>
            <td>${nome}</td>
            <td>${email}</td>
            <td>
                <button class="ui blue button" onclick="editRow(this)">Editar</button>
                <button class="ui red button" onclick="deleteRow(this)">Excluir</button>
            </td>
        `;

        // Limpa os campos de entrada
        document.getElementById('inputNome').value = '';
        document.getElementById('inputEmail').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para editar um usuário na tabela
function editRow(button) {
    const row = button.closest('tr');
    const nome = row.cells[1].textContent;
    const email = row.cells[2].textContent;

    // Coloca os valores atuais nos campos de entrada para edição
    document.getElementById('inputNome').value = nome;
    document.getElementById('inputEmail').value = email;

    // Muda o texto do botão para "Salvar"
    button.textContent = "Salvar";
    button.onclick = function () {
        row.cells[1].textContent = document.getElementById('inputNome').value;
        row.cells[2].textContent = document.getElementById('inputEmail').value;
        button.textContent = "Editar";
        button.onclick = function () { editRow(button); };
    };
}

// Função para excluir um usuário da tabela
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}
