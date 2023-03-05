function heightArray(min, max, nbr) {
    const distance = (max - min) / (nbr - 1);
    let result = [min];
    for(let i = 1; i < nbr; i++) {
        result.push(result[i-1] + distance);
    }

    for(let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

const test = heightArray(10, 100, 10);
console.log(test);