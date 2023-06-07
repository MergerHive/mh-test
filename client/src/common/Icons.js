import {
    BiCreditCard,
    BiBookmark,
    BiMessageDetail,
    BiBell,
    BiWrench,
    BiLogOutCircle,
    BiPhone,
    BiMap,
    BiBuildings,
    BiEditAlt,
    BiEdit,
    BiXCircle,
    BiUpArrowCircle,
    BiSearchAlt,
    BiTime,
    BiLockAlt,
    BiUserCircle,
    BiEnvelope,
    BiCaretDown,
    BiInfoCircle,
    BiFileBlank,
    BiDownload
} from "react-icons/bi";

import { BsFillStarFill, BsFillCircleFill, BsLink45Deg } from "react-icons/bs";

const icons = {
    invoices: BiCreditCard,
    bookmark: BiBookmark,
    inbox: BiMessageDetail,
    notifications: BiBell,
    settings: BiWrench,
    logout: BiLogOutCircle,
    phone: BiPhone,
    map: BiMap,
    industries: BiBuildings,
    edit: BiEditAlt,
    edit2: BiEdit,
    close: BiXCircle,
    upgrade: BiUpArrowCircle,
    search: BiSearchAlt,
    ratingStar: BsFillStarFill,
    biTime: BiTime,
    lock: BiLockAlt,
    user: BiUserCircle,
    mail: BiEnvelope,
    downArrow: BiCaretDown,
    infoCircle: BiInfoCircle,
    file: BiFileBlank,
    fileDownload: BiDownload,
    online: BsFillCircleFill,
    link: BsLink45Deg
}

export const getIcon = (name, size, color, className = "", onIconClick) => {
    const MenuIcon = icons[name]
    return (
        <MenuIcon className={`${className}`} size={size} color={color} onClick={onIconClick} />
    )
}

export const getIconWithClose = (name, size, color, uniqueID, handleFileRemove, className = "") => {
    const MenuIcon = icons[name]
    return (
        <MenuIcon id={uniqueID} className={`${className}`} size={size} color={color} onClick={handleFileRemove} />
    )
}

export default getIcon;