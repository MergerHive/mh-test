import React from 'react'
import locationData from "./data.json";
import industryData from "./industryData.json"
import menu from '../../constants/bizprofilemenu.json'
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import './styles.css'
import cx from "classnames";

const BusinessFilter = ({ setLocFilter, setIndustryFilter, setInterestType, intrestType = "" }) => {

    let intrestTypeMenu = menu.businessProfileTypes
    const industryDataFlatten = flattenTree(industryData);
    const locationDataFlatten = flattenTree(locationData);

    const handleOptionChange = (value) => {
        setInterestType(value)
    };

    const onIndustrySelect = (data) => {
        let { treeState } = data
        let selectedIds = [...treeState.selectedIds]
        let filteredList = industryDataFlatten.filter(item => selectedIds.includes(item.id))
        setIndustryFilter(filteredList)
    }

    const onLocationSelect = (data) => {
        const { treeState } = data;
        let selectedIds = [...treeState.selectedIds]
        setLocFilter(selectedIds.join(","))
    };


    return (
        <div className='flex flex-col divide-y divide-gray-300 max-w-[20%] min-w-[20%] bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300 h-full'>
            <h1 className='text-base font-bold p-4 bg-gray-100'>Filter By</h1>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-sm text-gray-500'>Business looking For </h1>
                {intrestTypeMenu.map((option) => (
                    <div key={option.id} className="flex gap-2 items-center">
                        <input
                            type="radio"
                            value={option.value}
                            checked={intrestType.value === option.value}
                            onChange={() => handleOptionChange(option)}
                            id={option.id}
                        />
                        <label htmlFor={option.id} className="text-sm">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-sm text-gray-500'>Select Industries</h1>
                <div className="checkbox">
                    <TreeView
                        data={industryDataFlatten}
                        aria-label="Checkbox tree"
                        multiSelect
                        propagateSelect
                        propagateSelectUpwards
                        togglableSelect
                        onSelect={onIndustrySelect}
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            isSelected,
                            isHalfSelected,
                            getNodeProps,
                            level,
                            handleSelect,
                            handleExpand,
                        }) => {
                            return (
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    style={{ marginLeft: 40 * (level - 1) }}
                                >
                                    {isBranch && <ArrowIcon isOpen={isExpanded} />}
                                    <CheckBoxIcon
                                        className="checkbox-icon"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            e.stopPropagation();
                                        }}
                                        variant={
                                            isHalfSelected ? "some" : isSelected ? "all" : "none"
                                        }
                                    />
                                    <span className="name">{element.name}</span>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-sm text-gray-500'>Select Locations</h1>
                <div className="checkbox">
                    <TreeView
                        data={locationDataFlatten}
                        aria-label="Checkbox tree"
                        multiSelect
                        propagateSelect
                        propagateSelectUpwards
                        togglableSelect
                        onSelect={onLocationSelect}
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            isSelected,
                            isHalfSelected,
                            getNodeProps,
                            level,
                            handleSelect,
                            handleExpand,
                        }) => {
                            return (
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    style={{ marginLeft: 40 * (level - 1) }}
                                >
                                    {isBranch && <ArrowIcon isOpen={isExpanded} />}
                                    <CheckBoxIcon
                                        className="checkbox-icon"
                                        onClick={(e) => {
                                            handleSelect(e);
                                            e.stopPropagation();
                                        }}
                                        variant={
                                            isHalfSelected ? "some" : isSelected ? "all" : "none"
                                        }
                                    />
                                    <span className="name">{element.name}</span>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const ArrowIcon = ({ isOpen, className }) => {
    const baseClass = "arrow";
    const classes = cx(
        baseClass,
        { [`${baseClass}--closed`]: !isOpen },
        { [`${baseClass}--open`]: isOpen },
        className
    );
    return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
    switch (variant) {
        case "all":
            return <FaCheckSquare {...rest} />;
        case "none":
            return <FaSquare {...rest} />;
        case "some":
            return <FaMinusSquare {...rest} />;
        default:
            return null;
    }
};
export default BusinessFilter