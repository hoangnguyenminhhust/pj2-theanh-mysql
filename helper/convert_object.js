module.exports = {
    convert: async (result) => {
        return new Promise((resolve, reject) => {
            let string = JSON.stringify(result)
            let object = JSON.parse(string)
            resolve(object)
        })
    }
}