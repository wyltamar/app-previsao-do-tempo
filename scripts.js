async function preverTempo() {

    const apiKey = "58c8fa2c58187081b787ed0121d89211"

    let cidade = document.querySelector(".input-cidade").value;
    let caixaMedia = document.querySelector(".caixa-media");


    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    let respostaServidor = await fetch(urlApi)

    let dados = await respostaServidor.json();

    caixaMedia.innerHTML = `
        <h2 class="cidade">${dados.name}</h2>
        <p class="temperatura">${Math.floor(dados.main.temp)}°C</p>
        <img src="http://openweathermap.org/img/wn/${dados.weather[0].icon}.png" alt="Ícone do tempo">
        <p class="umidade">Umidade: ${dados.main.humidity}%</p>
        <button class="botao-IA" onclick="respostaIA()">Sugestão de Roupa</button>
        <p class="resposta-IA"></p>
    `
}

function transcreverVoz() {
    const reconhecimentoVoz = new window.webkitSpeechRecognition();
    reconhecimentoVoz.lang = "pt-BR";
    reconhecimentoVoz.start();

    reconhecimentoVoz.onresult = function (evento) {
        const textoTranscrito = evento.results[0][0].transcript;
        document.querySelector(".input-cidade").value = textoTranscrito;

        preverTempo();
    }

}