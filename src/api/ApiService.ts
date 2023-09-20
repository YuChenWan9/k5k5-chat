import { extend, RequestOptionsWithoutResponse } from 'umi-request';

const request = extend({
    prefix: '/api',
    interceptors: {
        request: async (url: string, options: RequestOptionsWithoutResponse) => {
            return {
                url,
                options
            }
        },
        response: async (response: RequestOptionsWithoutResponse) => {
            return response
        }
    },
})

export default request;