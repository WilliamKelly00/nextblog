import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Metatags from '../../components/Metatags';
import AuthCheck from '../../components/AuthCheck';
import Link from 'next/link';
import StarButton from '../../components/StarButton';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';


export async function getStaticProps({ params }){
    const {username, slug} = params;
    const userDoc = await getUserWithUsername(username);
    
    let post;
    let path;

    if(userDoc){
        const postRef = userDoc.ref.collection('posts').doc(slug);
        post = postToJSON(await postRef.get());

        path = postRef.path;
    }

    return{
        props: {post, path},
        revalidate: 5000,
    };
}

export async function getStaticPaths(){
    const snapshot = await firestore.collection('posts').get();
    
    const paths = snapshot.docs.map(doc => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug },
        };
    });
    
    return{
        paths,
        fallback: 'blocking',
    };
}

export default function Post(props){
    const postRef = firestore.doc(props.path);
    const [realtimePost] = useDocumentData(postRef);

    const post = realtimePost || props.post;

    const {user: currentUser} = useContext(UserContext);
    
    return (
        <main className={styles.container}>
        <Metatags title={post.title} description={post.title} />
        
        <section>
          <PostContent post={post} />
        </section>
  
        <aside className="card">
          <p>
            <strong>{post.starCount || 0} ⭐</strong>
          </p>
  
          <AuthCheck
            fallback={
              <Link href="/enter">
                <button>🌟 Sign Up</button>
              </Link>
            }
          >
            <StarButton postRef={postRef} />
          </AuthCheck>
  
          {currentUser?.uid === post.uid && (
            <Link href={`/admin/${post.slug}`}>
              <button className="btn-blue">Edit Post</button>
            </Link>
          )}
        </aside>
      </main>
    )
}