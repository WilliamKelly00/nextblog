import Navbar from '../components/Navbar';
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';


function MyApp({ Component, pageProps }) {

  return(
    <UserContext.Provider value={useUserData}>
      <Navbar/>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp
