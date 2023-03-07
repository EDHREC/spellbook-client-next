import React, {FormEvent, useEffect, useState} from "react"
import Link from 'next/link'
import styles from './searchBar.module.scss'
import {useRouter} from "next/router";

type Props = {
  onHomepage?: boolean
  className?: string
  isAuthenticated?: boolean
}

const SearchBar: React.FC<Props> = ({onHomepage, className, isAuthenticated}: Props) => {

  const router = useRouter()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(router.query.q)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search?q=${inputValue}`)
  }

  useEffect(() => {
    setInputValue(router.query.q)
  }, [router.query.q])

  return (
    <div className={`${styles.outerContainer} ${className}`}>
      <form onSubmit={handleSubmit} className={styles.mainSearchInputContainer}>
        {!onHomepage &&
          <Link href="/" className="block mr-2 flex-shrink py-1">
            <div className="mr-1">
              <img src="/images/gear.svg" alt="Go to home page" className="w-8 inline-block"/>
            </div>
          </Link>
        }


        <div className="flex flex-grow items-center">
          {!onHomepage && <div className={styles.searchInputIcon} aria-hidden="true" onClick={() => 'focusSearch'}/>}
          <label htmlFor="search-bar-input" className="sr-only text-white" aria-hidden="true">Combo Search</label>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Seach combos" id="search-bar-input" type="text" className={`${styles.mainSearchInput} ${onHomepage ? 'text-2xl text-center' : 'pl-8 -ml-6'}`}/>
        </div>

        {!onHomepage &&
          <div className="flex flex-shrink flex-row items-center desktop-menu">
            <button id="search-bar-menu-button" type="button" className={styles.mobileMenuButton} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
              <div className={`${styles.menuIcon} ${styles.linkIcon}`} aria-hidden="true"/>
              <div className="sr-only">Menu</div>
            </button>
            <Link href="/advanced-search/" className={`hidden md:flex ${styles.menuLink}`}>
              <div className={`${styles.advancedSearchIcon} ${styles.linkIcon}`} aria-hidden="true"/>
              Advanced
            </Link>
            <Link href="/syntax-guide/" className={`hidden md:flex ${styles.menuLink}`}>
              <div className={`${styles.syntaxGuideIcon} ${styles.linkIcon}`} aria-hidden="true"/>
              Syntax
            </Link>
            <Link href="/random" className={`hidden md:flex ${styles.menuLink}`}>
              <div className={`${styles.randomIcon} ${styles.linkIcon}`} aria-hidden="true"/>
              Random
            </Link>
            {isAuthenticated && <Link href="/dashboard/" className={`hidden md:flex ${styles.menuLink}`}>
              <div className={`${styles.profileIcon} ${styles.linkIcon} mr-0`}/>
              <span className="sr-only">Profile</span>
            </Link>}
          </div>}
      </form>

      {!onHomepage && mobileMenuIsOpen &&
        <div className="md:hidden flex flex-wrap flex-row text-center mt-2 py-4 border-t border-light text-light" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
          <Link href="/advanced-search/" className={styles.mobileMenuButton}>
            <div className={`${styles.advancedSearchIcon} ${styles.linkIcon}`} aria-hidden="true"/>
            Advanced
          </Link>
          <Link href="/syntax-guide/" className={styles.mobileMenuButton}>
            <div className={`${styles.syntaxGuideIcon} ${styles.linkIcon}`} aria-hidden="true"/>
            Syntax
          </Link>
          <Link href="/random" className={styles.mobileMenuButton}>
            <div className={`${styles.randomIcon} ${styles.linkIcon}`} aria-hidden="true"/>
            Random
          </Link>
          {isAuthenticated && <Link href="/dashboard/" className={styles.mobileMenuButton}>
            <div className={`${styles.profileIcon} ${styles.linkIcon}`}/>
            Profile
          </Link>}
        </div>
      }

    </div>
  )
}

export default SearchBar
