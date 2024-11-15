let attempts = 0;
let bulls = 0;
let cows = 0;

let roundStats = {
  round: 1,
  wins: 0,
  loses: 0,
};

let secretNumber = generateSecretNumber();

function checkGuess() {
  let guess = document.getElementById("guessInput").value;

  let secretString = secretNumber.join("");
  bulls = 0;
  cows = 0;
  const checkGuessLength = new Set(guess);

  if (guess.length !== 4 || checkGuessLength.size !== 4) {
    document.getElementById(
      "logsArea"
    ).value += `${guess} n'est pas un chiffre valide, veuillez entrer un nombre d'exactement 4 chiffres différents. \n`;
    return null;
  }
  attempts += 1;

  for (let i = 0; i < 4; i += 1) {
    if (secretString[i] === guess[i]) {
      bulls += 1;
    } else if (secretString.includes(guess[i])) {
      cows += 1;
    }
  }

  if (bulls === 4) {
    document.getElementById(
      "logsArea"
    ).value = `${secretString} ! Bravo vous avez gagné en ${attempts} essais!`;
    roundStats.wins += 1;
    secretNumber = generateSecretNumber();
  } else if (attempts === 10) {
    document.getElementById(
      "logsArea"
    ).value = `PERDU! Dommage, vous avez dépassé le nombre d'essai maximum! \n`;
    roundStats.loses += 1;
    return playAgain();
  }
  document.getElementById(
    "logsArea"
  ).value += `${guess}-${bulls}B-${cows}C, try:${attempts}\n`;
  printGameStats();
}
function playAgain() {
  roundStats.round += 1;
  printGameStats();
  attempts = 0;
  bulls = 0;
  cows = 0;
  secretNumber = generateSecretNumber();
}

function printGameStats() {
  const gameStats = document.getElementById("gameStats");
  gameStats.innerHTML = `R: ${roundStats.round} | V: ${roundStats.wins} | D: ${roundStats.loses}`;
}

function generateSecretNumber() {
  const numbers = Array.from({ length: 9 }, (v, k) => k + 1);

  // Array.from (valeur d'un élément du tableau, fonction associée à chaque valeure)
  let currentIndex = numbers.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [numbers[currentIndex], numbers[randomIndex]] = [
      numbers[randomIndex],
      numbers[currentIndex],
    ];
  }

  return numbers.slice(0, 4);
}

const clearLogs = () => {
  document.getElementById("logsArea").value = "";
};

const printRules = () => {
  alert(
    "Entrez un nombre composé de 4 chiffres différents dans la case a côté de 'Guess'.L'ordinateur le comparera à un code secret et vous donnera deux indices sous  forme de 'Bulls' (B)  et de 'Cows' (C) pour vous permettre de découvrir le code secret.Que signifient ces indices? un Bulls est un chiffre présent dans les deux code et à la bonne place. Un Cows est un chiffre présent dans les deux codes mais à des places différentes. Par exemple si le code secret est 7512 et que vous essayez 5392, vous obtiendrez les indices '1B' et '1C'. "
  );
};
