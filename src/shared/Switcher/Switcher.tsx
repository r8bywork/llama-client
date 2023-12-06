import styles from './Switcher.module.scss';
interface SwitcherProps {
  handleChangeModel: () => void;
  model: string;
}
const Switcher = ({ handleChangeModel, model }: SwitcherProps) => {
  return (
    <div className={styles.switcher}>
      <div
        className={styles.model}
        onClick={() => handleChangeModel()}
      >
        {model}
      </div>
    </div>
  );
};
export default Switcher;
