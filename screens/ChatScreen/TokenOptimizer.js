// Contraction mapping
const contractionMap = {
    "don't": "dont",
    "can't": "cannot",
    "couldn't": "couldnt",
    "won't": "wont",
    "wouldn't": "wouldnt",
    "shouldn't": "shouldnt",
    "isn't": "isnt",
    "aren't": "arent",
    "wasn't": "wasnt",
    "weren't": "werent",
    "hasn't": "hasnt",
    "haven't": "havent",
    "hadn't": "hadnt",
    "doesn't": "doesnt",
    "didn't": "didnt",
    "i'm": "im",
};
// Tokenization function
function tokenOptimizer(text) {
    // Normalize text: convert to lowercase and remove extra spaces
    text = text.toLowerCase().replace(/\s+/g, ' ');

    text = text.replace(/(\w+)'(\w+)/g, (match, p1, p2) => {
        const expanded = contractionMap[match.toLowerCase()];
        return expanded ? expanded : match;
    });

    // Define regular expression for splitting by whitespace and punctuation
    const tokens = text.split(/[\s+,.!?'"/:;-]+/);
    console.log("tokens", tokens);

    // Define list of stop words as a Set for faster lookup
    const stopWords = new Set(["a", "an", "the", "is", "and", "in", "on", "at", "to", "for", "with", "of", "as"]);

    // Filter out stop words and empty tokens
    const filteredTokens = tokens.filter(token => token !== "" && !stopWords.has(token));

    return filteredTokens; //REDUCED ~30% of the original length
}

// Example usage
// let inputText = "The quick brown fox don't jumps over the lazy dog is an English-language pangram: a sentence that contains all; the letters of the alphabet. The phrase is commonly used for touch-typing practice, testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text where the use of all letters in the alphabet is desired.";
// let tokens = tokenOptimizer(inputText);
// console.log(`COMPARE ${inputText} \n ${tokens.join(" ")}`);
// console.log("compare", inputText.split("").length, tokens.length);

export default tokenOptimizer;