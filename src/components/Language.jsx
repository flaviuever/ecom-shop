import language from "../language";

const Language = ({ selectedLanguage, setSelectedLanguage }) => {

    return (
        <>
        <label htmlFor="cards">{selectedLanguage.labelForLanguage}</label>
        
        <button className="langBtn" onClick={() => setSelectedLanguage(language.english)}>
          <i className="flag">ENG</i>
        </button>

        <button className="langBtn" onClick={() => setSelectedLanguage(language.romanian)}>
          <i className="flag">ROU</i>
        </button>
        </>
    )
}

export default Language;