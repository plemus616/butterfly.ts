export function generateUsername(){
    const allowedChars = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9',
        '_'
    ];
    const randomLength = Math.floor(Math.random() * (16 - 5 + 1) + 5);
    let nombre = "";
    for(let i = 1; i <= randomLength; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        nombre = `${nombre}${allowedChars[randomIndex]}`
    }
    return nombre.trim();
}