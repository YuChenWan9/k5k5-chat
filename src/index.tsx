import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx';
import Store from '~/redux/index.ts';
import { Provider } from 'react-redux'

import 'normalize.css';
import '~/assets/scss/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={Store}>
        {/* <React.StrictMode> */}
            <App />
        {/* </React.StrictMode> */}
    </Provider>

)