import './index.scss';
import React from 'react';

type btnTypes = 'primary' | 'success' | 'warn' | 'dangr';


type MyButtonPropsType = React.PropsWithChildren<{ type?: btnTypes }>
function MyButton({
    type,
    children,
}: MyButtonPropsType) {

    const createClassName = () => ['btn', `btn-${ type ?? 'primary'}`].join(' ');

    console.log(createClassName())
    return (
        <button
            className={createClassName()}
        >{children}</button>
    )
}

export default MyButton;