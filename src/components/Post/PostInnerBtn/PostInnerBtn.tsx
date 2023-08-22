import styles from './PostInnerBtn.module.css';

const PostInnerBtn = ({
  btnText,
  btnTextActive,
  active,
  action,
  altAction,
}: {
  btnText: string;
  btnTextActive: string | undefined;
  active: boolean;
  action: (() => void) | undefined;
  altAction: (() => void) | undefined;
}) => {
  if (!active) {
    return (
      <button className={styles.btnDefault} onClick={action}>
        {btnText}
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.btnDefault} ${styles.btnSelectedModifier}`}
        onClick={altAction}
      >
        {btnTextActive}
      </button>
    );
  }
};

export default PostInnerBtn;
