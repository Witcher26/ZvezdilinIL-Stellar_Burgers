export class GlobalSessionStorage {
    setValue(key, value) {
        !!value && sessionStorage.setItem(key, JSON.stringify(value));
    }

    getValue(key, defaultValue) {
        const value = sessionStorage.getItem(key);
        return !!value ? JSON.parse(value) : defaultValue;
    }
}