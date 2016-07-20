export function urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
            throw 'Illegal base64url string!';
        }
    }
    return decodeURIComponent(window.atob(output)); // polifyll https://github.com/davidchambers/Base64.js
}

export function isValid(token: string) {
    try {
        decodeToken(urlBase64Decode(token));
    } catch (e) { return false; }
    return true;
}

export function decodeToken(token: string) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
    }
    const decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
        throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
}

export function getTokenExpirationDate(token: string) {
    const decoded = decodeToken(token);

    if (typeof decoded.exp === 'undefined') {
        return null;
    }
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
}

export function isTokenExpired(token: string, offsetSeconds: number = 0) {
    if (isValid(token)) return true;
    const date = getTokenExpirationDate(token);
    if (date === null) {
        return false;
    }
    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}
