import React from "react"
import styles from 'pages/syntax-guide.module.scss'
import ArtCircle, {ArtCircleProps} from "../ArtCircle/ArtCircle";
import SearchSnippet from "./SearchSnippet/SearchSnippet";

type Props = {
  heading: string,
  headingCardName: ArtCircleProps['cardName']
  snippets: {search: string, description: string}[]
  children: React.ReactNode
  id?: string

}

const SearchGuide: React.FC<Props> = ({heading, headingCardName, snippets, children}: Props) => {

  const id = heading.toLowerCase().split(' / ')[0].replace(" ", "-")

  return (
    <div id={id} className={`${styles.searchGuide} ${styles.searchGuideContainer} border-b-2 border-gray-400 w-full`}>
      <div className="container mt-6 mb-6 pb-4">
        <div className="mt-4 mb-4 flex-none text-center md:flex items-center">
          <ArtCircle cardName={headingCardName} size={7} className="mr-4 md:block hidden"/>
        </div>
        <h2 className="heading-title">{heading}</h2>

        <div className="flex-none md:flex w-full">
          <div className={`${styles.description} w-full md:w-1/2 flex-grow pl-4 pr-4 md:pl-0`}>
            {children}
          </div>

          <div
            className={`${styles.searchSnippets} w-full md:w-1/2 flex-grow pl-4 pr-4 md:pr-4`}
          >
            {snippets.map((snippet, i) => (
              <SearchSnippet key={i} search={snippet.search} description={snippet.description}/>
            ))}
          </div>

        </div>
      </div>


    </div>
  )
}

export default SearchGuide
