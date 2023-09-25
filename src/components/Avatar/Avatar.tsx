import avatarImg from '~/assets/images/login.png';
import './index.scss';

const Avatar = () => {
    return (
        <div className='avatar'>
            <img src={avatarImg} alt="" />

            <div className='login-status'>
                <div></div>
            </div>
        </div>
    )
}

export default Avatar;