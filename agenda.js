function abrirFormulario() {
    document.getElementById("formulario").style.display = "block";
}

async function confirmarReserva() {
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const email = document.getElementById("email").value;
    const espaco = document.getElementById("espaco").value;
    const nome = document.getElementById("nome").value;

    try {
        // Verifica se o horário já está agendado
        const horarioJaAgendado = await verificarHorarioAgendado(data, hora);
        
        if (horarioJaAgendado) {
            const mensagemErro = document.getElementById("mensagemErro");
            mensagemErro.textContent = "Este horário já está agendado. Por favor, selecione outro horário.";
            mensagemErro.style.display = "block";
            return;
        }

        // Se o horário não estiver agendado, prossegue com a inserção
        const response = await fetch('https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs'
            },
            body: JSON.stringify([{ data, hora, email, espaco, nome }])
        });

        if (response.status === 201) {
            // Exibir alerta de sucesso
            alert("Espaço reservado com sucesso!");

            // Limpar os campos do formulário
            document.getElementById("data").value = "";
            document.getElementById("hora").value = "";
            document.getElementById("email").value = "";
            document.getElementById("espaco").value = "";
            document.getElementById("nome").value = "";
        } else {
            // Exibir alerta de erro caso não seja possível confirmar a reserva
            alert("Erro ao confirmar a reserva. Por favor, tente novamente mais tarde.");
        }

    } catch (error) {
        console.error("Erro ao confirmar reserva:", error.message);
        alert("Erro ao confirmar a reserva. Por favor, tente novamente mais tarde.");
    }
}


async function verificarHorarioAgendado(data, hora) {
    try {
        const response = await fetch(`https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda?data=eq.${data}&hora=eq.${hora}`, {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs'
            }
        });
        const agendamentos = await response.json();

        return agendamentos.length > 0;
    } catch (error) {
        console.error("Erro ao verificar horário agendado:", error.message);
        return false;
    }
}
