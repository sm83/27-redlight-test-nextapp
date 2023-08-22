import { Svg1Block } from './SvgBlocks/Svg1Block';
import { Svg2Blocks } from './SvgBlocks/Svg2Blocks';
import { Svg3Blocks } from './SvgBlocks/Svg3Blocks';
import { Svg4Blocks } from './SvgBlocks/Svg4Blocks';
import styles from '../Post.module.css';

const BlockImage = ({ count }: { count: number }) => {
  if (count == 1) {
    return (
      <div className={styles.postLeftAreaImageArea}>
        <Svg1Block />
      </div>
    );
  } else if (count == 2) {
    return (
      <div className={styles.postLeftAreaImageArea}>
        <Svg2Blocks />
      </div>
    );
  } else if (count == 3) {
    return (
      <div className={styles.postLeftAreaImageArea}>
        <Svg3Blocks />
      </div>
    );
  } else {
    return (
      <div className={styles.postLeftAreaImageArea}>
        <Svg4Blocks />
      </div>
    );
  }
};

export default BlockImage;
