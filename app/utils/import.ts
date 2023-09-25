import { glob } from 'glob'
import type { GlobOptions } from 'glob'
import { resolve as pathResolve } from 'path';

export interface GlobImportOptions extends GlobOptions {
    cwd: string;
}

export const globImport = (pattern: string, options: GlobImportOptions) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new Promise<any[]>(async (resolve, reject) => {
        try {
            const res = await glob(pattern, options);
            resolve(res.map(e => require(pathResolve(options.cwd, e as string))))
        } catch (error) {
            reject(error)
        }
    });
