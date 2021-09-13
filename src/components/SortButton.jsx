import React from 'react';

export const SortButton = (props) => {
    const {sortByIdDescending, sortByIdAscending, sortByStatusAscending} = props;
    return (
        <div className="sortButtons sort-button-area-style">
            <button className="sort-button-style" onClick={sortByIdDescending}>id降順</button>
            <button className="sort-button-style" onClick={sortByIdAscending}>id昇順</button>
            <button className="sort-button-style" onClick={sortByStatusAscending}>ステータス順 進行中->未着手->完了</button>
        </div>
    )
}