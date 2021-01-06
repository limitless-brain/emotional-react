export interface IButtonProps {
    id?: string,
    label: string | undefined,
    icon: string | undefined,
    iconPos?: 'right' | 'left'
    onClick?: (id: string) => void
}

export interface ISelectableButtonProps extends IButtonProps{
    selectedId: string
}

export interface INavLinkProps extends IButtonProps{
    to: string
}