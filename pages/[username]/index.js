import UserProfile from "../../components/UserProfile"
import PostFeed from "../../components/PostFeed"
import { getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getServerSideProps({query}){
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if(userDoc){
        user = userDoc.data();
        const postQuery = userDoc.ref
        .collection('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(5);

        posts = (await postQuery.get()).docs.map(postToJSON);
    }


    return { props: { user, posts }, };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  )
}