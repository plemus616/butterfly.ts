
export class HttpClient{
    async get(url:string){
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    async post<T>(url: string, body: T){
        const res = await fetch(url, {
            headers: {
                "Content-Type":"application/json",
                body: JSON.stringify(body)
            }
        });

    }
}