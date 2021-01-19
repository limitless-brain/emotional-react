import React from 'react';
import {ISelectableButtonProps, INavLinkProps, IButtonProps} from "./blueprint";
import {NavLink} from "react-router-dom";

export const  SelectableFullWidthButton: React.FC<ISelectableButtonProps> = (props) => {

    const isSelected = props.id === props.selectedId

    return (
        <div
            key={props.id}
            id={props.id}
            onClick={() => props.onClick!(props.id!)}
            className={`group cursor-pointer w-full h-12 px-4 flex flex-row justify-between items-center ${isSelected?'bg-action-selected text-action-active':''} hover:bg-action-hover`}>
            <i className={`w-6 fa ${props.icon} text-center group-hover:text-action-active`}/>
            <span className={`select-none capitalize group-hover:text-action-active`}>{props.label}</span>
        </div>
    );
}

export const FullWidthNavLink: React.FC<INavLinkProps> = (props) => {
    const classes = `group cursor-pointer w-full h-12 px-4 flex ${props.iconPos === 'right'?'flex-row-reverse':'flex-row'} justify-between items-center hover:bg-action-hover`
    const activeClasses = `${classes} bg-action-selected text-action-active`
    return (
        <NavLink
            exact
            to={props.to}
            activeClassName={activeClasses}
            className={classes}>
            <i className={`w-6 fa ${props.icon} text-center group-hover:text-action-active`}/>
            <span className={`select-none capitalize group-hover:text-action-active`}>{props.label}</span>
        </NavLink>
    )
}

export const  FullWidthButton: React.FC<IButtonProps> = (props) => {

    return (
        <div
            onClick={() => {
                if(typeof props.onClick !== "undefined")
                    props.onClick!(props.id!)
            }}
            className={`group cursor-pointer w-full h-12 px-4 flex ${props.iconPos === 'right'?'flex-row-reverse':'flex-row'} justify-between items-center hover:bg-action-hover`}>
            <i className={`w-6 fa ${props.icon} text-center group-hover:text-action-active`}/>
            <span className={`select-none capitalize group-hover:text-action-active`}>{props.label}</span>
        </div>
    );
}