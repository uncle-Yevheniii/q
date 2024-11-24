export function getRandomColor(): string {
    const randomNum = Math.floor(Math.random() * 0xffffff)
    const hexColor = `#${randomNum.toString(16).padStart(6, '0')}`

    return hexColor
}
