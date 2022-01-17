import Link from "next/link"
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
    
    const {user, username} = useContext;

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">Feed</button>
                    </Link>
                </li>

                {username && (
                    <>
                        <li>
                            <Link href="/admin">
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL}/>
                            </Link>
                        </li>
                    </>
                )}

                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}


            </ul>
        </nav>
    )
}
