import React from 'react';
import {BUTTON_TAILWIND_STYLE} from "../../utils/Utils";
import {usePagination} from "@material-ui/lab";

export interface IPagination {
    count: number,
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void,
}

const Pagination: React.FC<IPagination> = (props) => {

    const {items} = usePagination({
        count: props.count,
        onChange: props.onChange
    })

    return (
        <div className="flex flex-row h-12">
            {items.map(({page, type, selected, ...item}, _) => {
                let children = null;

                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = (
                        <div
                            className="select-none w-12 flex justify-center items-center text-text-primary shadow">...</div>
                    )
                } else if (type === 'page') {
                    children = (
                        <button
                            className={`${BUTTON_TAILWIND_STYLE} ${selected ? 'bg-action-selected' : ''}`} {...item}>
                            {page}
                        </button>
                    )
                } else if (type === 'next') {
                    children = (
                        <button
                            className={`${BUTTON_TAILWIND_STYLE} focus:bg-action-selected`} {...item}>
                            <span className="w-12 fa fa-angle-right"/>
                        </button>
                    )
                } else if (type === 'previous') {
                    children = (
                        <button
                            className={`${BUTTON_TAILWIND_STYLE}`} {...item}>
                            <i className="w-12 fa fa-angle-left"/>
                        </button>
                    )
                }
                return children;
            })}
        </div>
    );
}

export default Pagination;