import styles from '../Post.module.css';

const BlockCount = ({ count }: { count: number }) => {
  if (count == 1) {
    return <span className={styles.postLeftAreaText}>{count} block</span>;
  } else {
    return <span className={styles.postLeftAreaText}>{count} blocks</span>;
  }
};

export default BlockCount;
