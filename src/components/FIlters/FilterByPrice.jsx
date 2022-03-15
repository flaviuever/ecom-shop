import './filters.css'
const FilterByPrice = ({onChangePrice, filteredPrice, selectedLanguage}) => {
    return (
        <div className="filter">
            <label className="label" htmlFor="price">{selectedLanguage.labelForFilterPrice}</label>

            <input className="input"
                type="number"
                value={filteredPrice}
                onChange={onChangePrice}
                placeholder="max Price"
            />
        </div>
        
    )
}

export default FilterByPrice;