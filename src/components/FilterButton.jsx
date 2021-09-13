import React from 'react';

export const FilterButton = (props) => {
    const {filterDisable, filterProgress, filterNotYet, filterComplete} = props;
    return (
        <div className="filter-buton-area-style">
            <button className="filter-button-style" onClick={filterDisable}>フィルター無し</button>
            <button className="filter-button-style" onClick={filterProgress}>進行中</button>
            <button className="filter-button-style" onClick={filterNotYet}>未着手</button>
            <button className="filter-button-style" onClick={filterComplete}>完了</button>
        </div>
    )
}