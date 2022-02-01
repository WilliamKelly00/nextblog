import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';

// Allows user to star or like a post
export default function Star({ postRef }) {
  // Listen to star document for currently logged in user
  const starRef = postRef.collection('stars').doc(auth.currentUser.uid);
  const [starDoc] = useDocument(starRef, {snapshotListenOptions: {includeMetadataChanges: true}});

  // Create a user-to-post relationship
  const addStar = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { starCount: increment(1) });
    batch.set(starRef, { uid });

    try{
      await batch.commit();
    }catch(err){
      toast.error("You've already starred this post!")
    }
  };

  // Remove a user-to-post relationship
  const removeStar = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { starCount: increment(-1) });
    batch.delete(starRef);

    try{
      await batch.commit();
    }catch(err){
      toast.error("You haven't starred this post!")
    }
  };

  // return starDoc?.exists ? (
  //   <button onClick={removeStar}>🌠 Unstar</button>
  // ) : (
  //   <button onClick={addStar}>🌟 Star</button>
  // );

  return (
    <>
      <button onClick={addStar}>🌟 Star</button>
      <button onClick={removeStar}>🌠 Unstar</button>
    </>
  );
}