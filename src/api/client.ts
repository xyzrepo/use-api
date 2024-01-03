export class ApiClient {
        private http: (config: any) => Promise<any>;
    
        constructor(http: (config: any) => Promise<any>) {
            this.http = http;
        }
    
        async get<T>(url: string, config?: any): Promise<T> {
            return this.http({ method: 'GET', url, ...config });
        }
    
        async post<T>(url: string, data?: any, config?: any): Promise<T> {
            return this.http({ method: 'POST', url, data, ...config });
        }
    
        async put<T>(url: string, data?: any, config?: any): Promise<T> {
            return this.http({ method: 'PUT', url, data, ...config });
        }
    
        async delete<T>(url: string, config?: any): Promise<T> {
            return this.http({ method: 'DELETE', url, ...config });
        }
    
        async patch<T>(url: string, data?: any, config?: any): Promise<T> {
            return this.http({ method: 'PATCH', url, data, ...config });
        }

        async head<T>(url: string, config?: any): Promise<T> {
            return this.http({ method: 'HEAD', url, ...config });
        }

        async options<T>(url: string, config?: any): Promise<T> {
            return this.http({ method: 'OPTIONS', url, ...config });
        }

}
