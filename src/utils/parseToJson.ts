export function parseToJson(m: string){
    try{
        return JSON.parse(m);
    } catch (err){
        return m;
    }
}