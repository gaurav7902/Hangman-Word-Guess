import {useCallback, useEffect, useState} from "react";
import words from "./wordList.json";
import {HangmanDrawing} from "./HangmanDrawing";
import {HangmanWord} from "./HangmanWord";
import {Keyboard} from "./Keyboard";

const getWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord());

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter),
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split("")
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;

            setGuessedLetters((currLetters) => [...currLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser],
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (key !== "Enter") return;

            e.preventDefault();
            setWordToGuess(getWord());
            setGuessedLetters([]);
        };

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    });

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();
            addGuessedLetter(key);
        };
        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    });

    return (
        <div
            style={{
                maxWidth: "800px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <div
                style={{
                    fontSize: "2rem",
                    textAlign: "center",
                    color: isWinner ? "green" : "red",
                    fontWeight: "bold",
                }}>
                {isWinner && "You won! - Press Enter for new game :)"}
                {isLoser && "Nice try diddy! Press Enter to try again :("}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                revealed={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{alignSelf: "stretch"}}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter),
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetters={addGuessedLetter}
                />
            </div>
        </div>
    );
}

export default App;
