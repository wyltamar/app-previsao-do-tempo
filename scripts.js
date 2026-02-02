const chaveIA = "sua chave_aqui";

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
        <button class="botao-IA" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
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

async function pedirSugestaoRoupa(){
    
    let temperatura = document.querySelector(".temperatura").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent

    const enderecoIA = "https://api.groq.com/openai/v1/chat/completions";

    let resposta = await fetch(enderecoIA, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chaveIA
        },
        body: JSON.stringify({

            "model": "meta-llama/llama-4-maverick-17b-128e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": `Com base na temperatura de ${temperatura} e umidade de ${umidade} em ${cidade}, 
                    que roupa você recomendaria para vestir hoje? Explique sua recomendação em poucas palavras.`
                },
            ]      
          })
    });


    let dados = await resposta.json()    
    let sugestaoRoupa = dados.choices[0].message.content;
    document.querySelector(".resposta-IA").textContent = sugestaoRoupa;

}