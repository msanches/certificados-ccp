document.getElementById('validarBtn').addEventListener('click', function() {
    const chaveInput = document.getElementById('chaveInput').value;
    fetch('js/certificados.json')
        .then(response => response.json())
        .then(data => {
            const certificados = data.certificados;
            const certificadoValido = certificados.find(cert => cert.chave === chaveInput);
            const resultado = document.getElementById('resultado');
            if (certificadoValido) {
                resultado.innerHTML = `
                    <span class="valido">
                            <i class="fa-solid fa-square-check"></i> Certificado válido!</span><br>
                    <hr>
                    <strong>Nome:</strong> ${certificadoValido.nome}<br>
                    <strong>Carga horária:</strong> ${certificadoValido.horas} h<br>
                    <strong>Data de Emissão:</strong> ${certificadoValido.data_emissao}<br>
                    <strong>Responsável:</strong> ${certificadoValido.responsavel}<br>
                    <p><button id="novaConsultaBtn">Nova Consulta</button></p>
                `;                
                // Adiciona o evento de clique ao botão "Nova Consulta" após a validação
                document.getElementById('novaConsultaBtn').addEventListener('click', novaConsulta);
            } else {
                resultado.innerHTML = `
                        <span class="invalido"><i class="fa-solid fa-square-xmark"></i> Certificado inválido!</span>
                        <p><button id="novaConsultaBtn">Nova Consulta</button></p>
                `;
                // Adiciona o evento de clique ao botão "Nova Consulta" após a validação
                document.getElementById('novaConsultaBtn').addEventListener('click', novaConsulta);               
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
});

const novaConsulta = () => {
    document.getElementById('chaveInput').value = '';  // Limpa o campo de entrada
    document.getElementById('resultado').innerHTML = '';  // Limpa o resultado
};