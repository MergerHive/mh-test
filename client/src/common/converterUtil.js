export const getNumberInWords = (numberString, country) => {
    if (numberString === '' || numberString === ('-NA-')) {
        return '-NA-'
    }
    else {
        let finalNumber = ""
        if (country.currency === 'INR') {
            let number = Number(numberString.replace(/,/g, ''))
            finalNumber = convertNumberToWordsINR(number)
        }
        else {
            let number = Number(numberString.replace(/,/g, ''))
            finalNumber = convertNumberToWords(number)
        }
        return country.currency + " " + finalNumber
    }
}

const getActualValue = (value, exchangeRate) => {
    let number = Number(value.replace(/,/g, ''))
    return Math.ceil((number * exchangeRate)).toString()
}

export const getExchangeRates = async (baseCountrySYB, currentCountySYB) => {
    try {
        let response = await fetch(`http://localhost:3500/util/getExchangeRate?baseSymbol=${baseCountrySYB}&targetSymbol=${currentCountySYB}`);
        response = await response.json()
        return (response.rates[currentCountySYB])
    }
    catch (error) {
        return 1
    }
}

export const getFormattedNumber = (number, exchangeRate) => {
    let actualValue = getActualValue(number, exchangeRate)
    return getformatedNumber(actualValue)
}

const convertNumberToWordsINR = (number) => {
    let wordsString = "";
    if (number < 100) {
        return number;
    }

    if (number >= 10000000) {
        wordsString += Math.floor(number / 10000000) + " Crore ";
        number %= 10000000;
        return wordsString;
    }

    if (number >= 100000) {
        wordsString += Math.floor(number / 100000) + " Lakh ";
        number %= 100000;
        return wordsString;
    }

    if (number >= 1000) {
        wordsString += Math.floor(number / 1000) + " Thousand ";
        number %= 1000;
        return wordsString;
    }

    if (number >= 100) {
        wordsString += Math.floor(number / 100) + " Hundred ";
        number %= 100;
        return wordsString;
    }

}

const convertNumberToWords = (number) => {
    if (number === 0) return 0;


    let wordsString = "";
    if (number < 100) {
        return number;
    }

    if (number >= 1000000000) {
        wordsString += Math.floor(number / 1000000000) + " Billion ";
        number %= 1000000000;
        return wordsString;
    }

    if (number >= 1000000) {
        wordsString += Math.floor(number / 1000000) + " Million ";
        number %= 1000000;
        return wordsString;
    }

    if (number >= 1000) {
        wordsString += Math.floor(number / 1000) + " K ";
        number %= 1000;
        return wordsString;
    }

    if (number >= 100) {
        wordsString += Math.floor(number / 100) + " Hundred ";
        number %= 100;
        return wordsString;
    }

}

export const getformatedNumber = (inputValue) => {
    const numericInputRegex = /^[0-9]*$/;
    let inputValueWithoutCommas = Number(inputValue.replace(/,/g, ''))
    if (numericInputRegex.test(inputValueWithoutCommas)) {
        const formattedValue = Number(inputValueWithoutCommas).toLocaleString();
        return formattedValue
    }
    return
}