export function isValidUrlOrDomain(input: string) {
    const value = input.trim();
    if (!value) return false;

    const domainRegex =
        /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;

    if (domainRegex.test(value)) return true;

    try {
        const url = new URL(value);

        if (!["http:", "https:"].includes(url.protocol)) return false;

        return domainRegex.test(url.hostname);
    } catch {
        return false;
    }
}
