export function checkResponse(res: Response) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

/* Проверка на объект */
export const isObject = (obj: object) => typeof obj === 'object' && obj !== null;

/*Создаёт новый объект, в котором ключи без значений заменяются ключами со значением пустой строки*/
export const filterObjectByFilledValues = (params: any | unknown) => isObject(params)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ? Object.keys(params).reduce((currentObject, key) => params[key] ? {...currentObject, [key]: params[key]} : currentObject, "")
    : {};
    