import type { ElectronRendererContext } from '@app/types/index';
declare global {
    interface Window {
        electron: ElectronRendererContext 
    }
}