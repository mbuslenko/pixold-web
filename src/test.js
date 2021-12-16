const request = {
    headers: {
        user: "Daniil",
        authorization: "12321312312321312"
    }
}


const user = request.headers.user
const authorization = request.headers.authorization
const test = request.headers.test

const { authorization, user, test } = request.headers;