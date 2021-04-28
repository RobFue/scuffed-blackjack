export const shuffle = (array) => {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

export const getValue = (array: Array<number>) => {
    let value = 0
    let i = 0
    for (i = 0; i < array.length; i++) {
        value += array[i]
    }

	return value
}