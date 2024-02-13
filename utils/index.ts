export const getDomain = () => {
    return new URL(process.env.NODE_ENV === 'production'
        ? 'http://fornow.com'
        : 'http://localhost:3000'
    )
}