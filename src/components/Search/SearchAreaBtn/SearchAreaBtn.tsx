import styles from '../Search.module.css';

const btnActive = `${styles.btn}`;
const btnInactive = `${styles.btn} ${styles.opactiyModifier}`;

const SearchAreaBtn = ({
  btnText,
  active,
  action,
}: {
  btnText: string;
  active: boolean;
  action: () => void;
}) => {
  if (active) {
    return <button className={btnActive}>{btnText}</button>;
  } else {
    return (
      //only inactive button is pressable and it will do action
      <button className={btnInactive} onClick={action}>
        {btnText}
      </button>
    );
  }
};

export default SearchAreaBtn;
