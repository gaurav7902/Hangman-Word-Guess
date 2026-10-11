type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
};
export function HangmanWord({guessedLetters, wordToGuess}: HangmanWordProps) {
    return (
        <div
            style={{
                display: "flex",
                gap: "0.25em",
                fontSize: "6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}>
            {wordToGuess.split("").map((ch, index) => {
                return (
                    <span
                        style={{
                            borderBottom: "0.1em solid black",
                            // textDecoration: 'underline', //? border looks better
                        }}
                        key={index}>
                        <span
                            style={{
                                visibility: guessedLetters.includes(ch)
                                    ? "visible"
                                    : "hidden",
                            }}>
                            {ch}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}
