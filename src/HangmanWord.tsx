type HangmanWordProps = {
    revealed: boolean;
    guessedLetters: string[];
    wordToGuess: string;
};
export function HangmanWord({
    revealed,
    guessedLetters,
    wordToGuess,
}: HangmanWordProps) {
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
                                visibility:
                                    guessedLetters.includes(ch) || revealed
                                        ? "visible"
                                        : "hidden",
                                color:
                                    !guessedLetters.includes(ch) && revealed
                                        ? "red"
                                        : "green",
                            }}>
                            {ch}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}
