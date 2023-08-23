import styles from '../Header.module.css';

const LoginBtn = ({
  loginName,
  type,
  text,
}: {
  loginName: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
}) => {
  if (loginName.trim().length != 0) {
    // console.log('loginName not 0');
    return (
      <button className={styles.enterLoginBtn} type={type}>
        {text}
      </button>
    );
  } else {
    // console.log('loginName 0');
    return (
      <button className={styles.enterLoginBtn} type={'reset'}>
        {text}
      </button>
    );
  }
};

export default LoginBtn;
