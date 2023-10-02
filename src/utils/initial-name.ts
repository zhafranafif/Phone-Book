export const initialName = (firstname: string) => {
    return firstname.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase()
}