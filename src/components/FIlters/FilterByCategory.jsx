// import React from "react";

const FilterByCategory = ({ onChangeCategory, categoryList, selectedLanguage}) =>{
        return (
            <>
            <label className="label">
                {selectedLanguage.labelForFilterCategory}
            </label>
            <select
            className="input"
            onChange={onChangeCategory}>
                {categoryList.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            </>
        )
}

export default FilterByCategory;