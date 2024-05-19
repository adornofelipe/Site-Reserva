// Função para criar a tabela de agendamentos
async function criarTabelaAgendamentos() {
    const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda', {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs'
            }
        });
        const agendamentos = await response.json();

        agendamentos.forEach(agendamento => {
            const row = tabela.insertRow();
            row.insertCell(0).innerHTML = agendamento.id;
            row.insertCell(1).innerHTML = agendamento.data;
            row.insertCell(2).innerHTML = agendamento.hora;
            row.insertCell(3).innerHTML = agendamento.email;
            row.insertCell(4).innerHTML = agendamento.nome;
            row.insertCell(5).innerHTML = agendamento.espaco;
            // Adicionar botões de editar e remover
            row.insertCell(6).innerHTML = `
                <button class="btn btn-warning" onclick="editarAgendamento(${agendamento.id})">Editar</button>
                <button class="btn btn-danger" onclick="removeAgendamento(${agendamento.id})">Remover</button>
            `;
        });

    } catch (error) {
        console.error('Erro ao carregar os dados:', error.message);
    }
}
async function removeAgendamento(id) {
    if (confirm('Tem certeza que deseja remover este agendamento?')) {
        const supabaseUrl = 'https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs';
        
        try {
            const response = await fetch(`${supabaseUrl}?id=eq.${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                },
            });

            if (response.ok) {
                alert('Agendamento removido com sucesso!');
                location.reload();
            } else {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}
// Chamar a função para criar a tabela quando a página carregar acabou ficando aqui pq tbm funcionou 
window.onload = function() {
    criarTabelaAgendamentos();
};


// Função para editar agendamento
function editarAgendamento(id) {
    const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];
    for (let i = 0; i < tabela.rows.length; i++) {
        if (tabela.rows[i].cells[0].innerHTML == id) {
            const agendamento = {
                id: tabela.rows[i].cells[0].innerHTML,
                data: tabela.rows[i].cells[1].innerHTML,
                hora: tabela.rows[i].cells[2].innerHTML,
                email: tabela.rows[i].cells[3].innerHTML,
                nome: tabela.rows[i].cells[4].innerHTML,
                espaco: tabela.rows[i].cells[5].innerHTML
            };
            exibirFormularioEdicao(agendamento);
        }
    }
}

// Função para exibir formulário de edição
function exibirFormularioEdicao(agendamento) {
    const formHTML = `
        <div class="form-group">
            <label for="edit-data">Data</label>
            <input type="text" class="form-control" id="edit-data" value="${agendamento.data}">
        </div>
        <div class="form-group">
            <label for="edit-hora">Hora</label>
            <input type="text" class="form-control" id="edit-hora" value="${agendamento.hora}">
        </div>
        <div class="form-group">
            <label for="edit-email">Email</label>
            <input type="text" class="form-control" id="edit-email" value="${agendamento.email}">
        </div>
        <div class="form-group">
            <label for="edit-nome">Nome</label>
            <input type="text" class="form-control" id="edit-nome" value="${agendamento.nome}">
        </div>
        <div class="form-group">
            <label for="edit-espaco">Espaço</label>
            <input type="text" class="form-control" id="edit-espaco" value="${agendamento.espaco}">
        </div>
        <button class="btn btn-primary" onclick="salvarEdicao(${agendamento.id})">Salvar</button>
        <button class="btn btn-secondary" onclick="cancelarEdicao()">Cancelar</button>
    `;
    const formContainer = document.getElementById('form-edicao');
    formContainer.style.display = 'block';
    formContainer.innerHTML = formHTML;
}

// Função para salvar edição
function salvarEdicao(id) {
    const data = document.getElementById('edit-data').value;
    const hora = document.getElementById('edit-hora').value;
    const email = document.getElementById('edit-email').value;
    const nome = document.getElementById('edit-nome').value;
    const espaco = document.getElementById('edit-espaco').value;

    // Atualizar os dados no backend utilizando o método PATCH
    fetch(`https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda?id=eq.${id}`, {
        method: 'PATCH', // Alteração aqui: de 'PUT' para 'PATCH'
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs'
        },
        body: JSON.stringify({ data, hora, espaco, email, nome })
    })
    .then(response => {
        if (response.status === 204) {
            // Atualizar a tabela na interface do usuário
            const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];
            for (let i = 0; i < tabela.rows.length; i++) {
                if (tabela.rows[i].cells[0].innerHTML == id) {
                    tabela.rows[i].cells[1].innerHTML = data;
                    tabela.rows[i].cells[2].innerHTML = hora;
                    tabela.rows[i].cells[3].innerHTML = email;
                    tabela.rows[i].cells[4].innerHTML = nome;
                    tabela.rows[i].cells[5].innerHTML = espaco;
                }
            }
            // Fechar o formulário de edição
            document.getElementById('form-edicao').style.display = 'none';
            // Exibir popup de sucesso
            alert('Alteração realizada com sucesso!');
            // Recarregar a página
            location.reload();
        } else {
            throw new Error('Erro ao salvar edição: ' + response.status);
        }
    })
    .catch(error => console.error('Erro:', error));
}







// Função para cancelar edição
function cancelarEdicao() {
    document.getElementById('form-edicao').style.display = 'none';
}

// Chamar a função para criar a tabela quando a página carregar
window.onload = function() {
    criarTabelaAgendamentos();
};