import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Posts.module.css';
import { PostType, fetchPost } from '../../store/postSlice';
import Post from '../Post/Post';

const Posts = () => {
  const dispatch = useAppDispatch();

  const currentList: number = 1;

  const searchField = useAppSelector((state) => state.session.searchField);

  useEffect(() => {
    dispatch(fetchPost({ currentList, searchField }));
  }, [searchField]);

  const currentMode = useAppSelector((state) => state.session.postsDisplayMode);

  const selectedPosts = useAppSelector((state) => state.session.selected);

  const allPosts = useAppSelector((state) => state.posts.list);

  const acceptedPosts = allPosts.filter((post) =>
    selectedPosts?.includes(post.id)
  );

  let renderingByMode: PostType[] = [];

  if (!currentMode) {
    renderingByMode = allPosts;
  } else {
    renderingByMode = acceptedPosts;
  }

  // const searchField = useAppSelector((state) => state.session.searchField);

  // let renderingBySearch: PostType[] = [];

  // renderingBySearch = renderingByMode.filter((post) =>
  //   post.title.toLowerCase().includes(searchField.toLowerCase())
  // );

  // console.log(renderingBySearch);

  return (
    <div className={styles.postsFixedArea}>
      <div className={styles.postsScroll}>
        {renderingByMode.map((postObject, index) => (
          <Post key={index} todoElement={postObject} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
