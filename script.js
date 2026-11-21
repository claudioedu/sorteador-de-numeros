// Captura dos elementos

const qntNumsInput = document.querySelector("#amount");
const minNumInput = document.querySelector("#min");
const maxNumInput = document.querySelector("#max");
const form = document.querySelector("#form-sort");
const noRepeatInput = document.querySelector("#no-repeat");
const sectionSort = document.querySelector(".section-sort");
const sectionResult = document.querySelector(".section-result");
const backButton = document.querySelector(".btn-sort-again");
const themeSelect = document.querySelector("#theme");

// Aplica o tema escolhido ao elemento que define as cores da página.
function applyTheme() {
  document.documentElement.dataset.theme = themeSelect.value;
}

themeSelect.addEventListener("change", applyTheme);
applyTheme();

// Gera um inteiro aleatório dentro do intervalo, incluindo os limites inteiros.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let contadorSorteios = 0;

// Lê o formulário, realiza o sorteio e troca o formulário pela tela de resultados.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // incrementa o contador e atualiza o texto no HTML
  contadorSorteios++;
  const resultOrderSpan = document.querySelector(".result-order");
  resultOrderSpan.innerText = `${contadorSorteios}º`;

  const quantidade = qntNumsInput.valueAsNumber;
  const min = minNumInput.valueAsNumber;
  const max = maxNumInput.valueAsNumber;

  let randomNumbers = [];

  // Função que preenche o array até ter exatamente `quantidade` valores
  function loopNumbers() {
    while (randomNumbers.length < quantidade) {
      randomNumbers.push(getRandomIntInclusive(min, max));
    }
  }

  // Primeiro preenche o array
  loopNumbers();

  if (noRepeatInput.checked) {
    // Cria o Set e continua gerando números enquanto faltar
    const uniqueNumbers = new Set(randomNumbers);
    while (uniqueNumbers.size < quantidade) {
      uniqueNumbers.add(getRandomIntInclusive(min, max));
    }
    randomNumbers = [...uniqueNumbers];
  }

  // Esconde a seção do formulário
  sectionSort.classList.add("hidden");

  // Limpa resultados anteriores
  const resultContainer = document.querySelector(".result-numbers");
  resultContainer.innerHTML = "";

  // Agenda a exibição de cada número com um atraso proporcional à sua posição.
  randomNumbers.forEach((number, index) => {
    // Cria e insere o elemento do número quando o atraso termina.
    setTimeout(() => {
      const numberElement = document.createElement("span");
      numberElement.classList.add("number-item");
      numberElement.innerText = number;

      resultContainer.appendChild(numberElement);
    }, index * 300); // 300ms entre cada número
  });

  // Exibe a seção de resultado
  sectionResult.classList.remove("hidden");
});

// Volta ao formulário e restaura os valores iniciais dos campos numéricos.
backButton.addEventListener("click", function (event) {
  event.preventDefault();

  sectionResult.classList.add("hidden");
  sectionSort.classList.remove("hidden");

  qntNumsInput.value = "5";
  minNumInput.value = "0";
  maxNumInput.value = "50";
});
