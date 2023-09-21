import avatarImg from '../../../assets/images/login.png';
import K5K5Input from '~/components/K5K5Input';

function AccountSecretLogin () {
    return (
        <div className="account-secret-login">
            <div className="avatar">
                <img src={avatarImg} alt="" />
            </div>
            <K5K5Input />
            <K5K5Input />
        </div>
    )
}

export default AccountSecretLogin;