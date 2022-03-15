import Flags from 'country-flag-icons/react/3x2'
import language from "../language";
import "./category.css"

const Language = ({ selectedLanguage, setSelectedLanguage }) => {

    return (
        <div className='flags'>
          <button className="langBtn" onClick={() => setSelectedLanguage(language.english)}>
            <Flags.EU className="flag" title="Europe" />
          </button>
          
          <button className="langBtn" onClick={() => setSelectedLanguage(language.romanian)}>
            <Flags.RO className="flag" title="Roumania" />
          </button>
        </div>
    )
}

export default Language;