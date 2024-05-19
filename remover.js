/*  Função para remover filmes inseridos usando ID   */

async function removeagendamento() {
    const supabaseUrl = 'https://msptakyjvoutostzipra.supabase.co/rest/v1/agenda'; //  URL do seu projeto Supabase
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcHRha3lqdm91dG9zdHppcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDE3NTUsImV4cCI6MjAyMDIxNzc1NX0.E6x7UREzEhITGMcPW7r5qWH4laMoy8rR5sWmehPz0qs'; // chave do Supabase

    /* Campo id do filme*/
    const idDigitado = document.getElementById('idagen').value;

    /* url do supabase e comparação de ID*/
    const response = await fetch(`${supabaseUrl}?id=eq.${idDigitado}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
        },
    });

    if (response.ok) {
        alert('Reserva Removida');
      } else {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
    } 