const FilterByName = ({onChangeName, filteredName, selectedLanguage}) => {
    return (
        <>
        <div>
        <label className="label" htmlFor="names">{selectedLanguage.labelForFilterName}</label>

            <input  className="input"
                    type="text" 
                    value={filteredName}
                    onChange={onChangeName}
                    />
        </div>
        </>
    )
}

export default FilterByName;