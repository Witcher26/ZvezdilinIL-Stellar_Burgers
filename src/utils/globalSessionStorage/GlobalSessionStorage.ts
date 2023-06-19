export class GlobalSessionStorage {
    setValue(key: string, value: string) {
        !!value && sessionStorage.setItem(key, JSON.stringify(value));
    }

    getValue(key: string, defaultValue: string) {
        const value = sessionStorage.getItem(key);
        return !!value && value !== 'undefined' ? JSON.parse(value) : defaultValue;
    }
}
