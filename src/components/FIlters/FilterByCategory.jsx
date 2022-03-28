import React from "react";
import './filters.css'
const FilterByCategory = ({ onChangeCategory, categoryList, categoryFilter, selectedLanguage}) =>{
        return (
            <div className="filter">
                <label className="label">
                    {selectedLanguage.labelForFilterCategory}
                </label>
                <select
                value={categoryFilter}
                className="input"
                onChange={onChangeCategory}
                >
                    {categoryList.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
            </div>
        )
}

export default FilterByCategory;