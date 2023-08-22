import { PostElementInterface } from '../../interfaces/PostElementInterface';
import BlockImage from './Blocks/BlockImage';
import BlockCount from './Blocks/BlockCount';
import styles from './Post.module.css';
import PostInnerBtn from './PostInnerBtn/PostInnerBtn';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToSelected, removeFromSelected } from '../../store/sessionSlice';

const Post = ({ todoElement }: { todoElement: PostElementInterface }) => {
  const dispatch = useAppDispatch();

  const logined = useAppSelector((state) => state.session.logined);

  // console.log(todoElement.id);

  const currentUserId = useAppSelector((state) => state.session.id);
  const alreadySelected = useAppSelector((state) => state.session.selected);

  const handleAddPostToSelected = () => {
    if (currentUserId != null) {
      if (!alreadySelected?.includes(todoElement.id)) {
        dispatch(
          addToSelected({
            userId: currentUserId,
            postId: todoElement.id,
            alreadySelected: alreadySelected,
          })
        );
      }
    }
  };

  const handleRemovePostFromSelected = () => {
    if (alreadySelected != null) {
      if (alreadySelected.includes(todoElement.id)) {
        dispatch(
          removeFromSelected({
            userId: currentUserId,
            postId: todoElement.id,
            alreadySelected: alreadySelected,
          })
        );
      }
    }
  };

  const checkPostAlreadySelected = () => {
    if (alreadySelected != null) {
      if (alreadySelected.includes(todoElement.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className={styles.postArea}>
      <div className={styles.postOverlayGradient} />
      <div className={styles.postAreas}>
        <div className={styles.postLeftArea}>
          <BlockImage count={todoElement.blocksCount} />
          <BlockCount count={todoElement.blocksCount} />
        </div>
        <div className={styles.postMiddleArea}>
          <div className={styles.postTitle}>{todoElement.title}</div>
          <div className={styles.postDescription}>
            {todoElement.description}
          </div>
        </div>
        <div className={styles.postRightArea}>
          <PostInnerBtn
            btnText="Details"
            btnTextActive={undefined}
            active={false}
            action={undefined}
            altAction={undefined}
          />
          {logined && (
            <PostInnerBtn
              btnText="Mark as Suitable"
              btnTextActive="Skip Selection"
              active={checkPostAlreadySelected()}
              action={handleAddPostToSelected}
              altAction={handleRemovePostFromSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
