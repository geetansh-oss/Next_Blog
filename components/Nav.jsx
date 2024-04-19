'use client'
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import '@/styles/globals.css';

const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders(); 
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* For Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/createPrompt" className="black_btn">
              Create Post
            </Link>
            <button 
              type="button" 
              onClick={signOut} 
              className="outline_btn"
            >Sign Out</button>
            <Link href="profile">
              <Image
                src="/assets/images/logo.svg"
                alt="Promptopia logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        ):(
          <>
            {providers && 
              Object.values(providers).map((provider)=>
                <button 
                  type="button" 
                  key={provider.name} 
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >Sign In</button>
              )
            }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
              onClick={()=>settoggleDropDown((prev)=>!prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link 
                  href="/profile"
                  className="dropdown_link"
                  onClick={() =>{
                    settoggleDropDown(false);
                  }}
                >My Profile</Link>
                <Link 
                  href="/createPrompt"
                  className="dropdown_link"
                  onClick={() =>{
                    settoggleDropDown(false);
                  }}
                >Create Prompt</Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={()=>{
                    settoggleDropDown(false);
                    signOut();
                  }}
                >Sign Out</button>
              </div>
            )}
          </div>
        ):(
         <>
            {providers && 
              Object.values(providers).map((provider)=>
                <button 
                  type="button" 
                  key={provider.name} 
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >Sign In</button>
              )
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav;