import React from 'react'
import AsyncSelect from 'react-select/async';
import industriesList from '../../constants/IndustriesMenu.json'
import MHToolTip from '../../components/ToolTip/ToolTip';

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        height: 36,
        minHeight: 36,
        boxShadow: state.isFocused ? 'inset 0 2px 4px 0 #d1d5db' : 'inset 0 2px 4px 0 #d1d5db',
        border: state.isFocused ? '1px solid #D1D5DB' : '1px solid #D1D5DB',
        '&:hover': {
            border: state.isFocused ? '1px solid #D1D5DB' : '1px solid #D1D5DB'
        }
    })
}

const IndustrySelect = ({ id, label, field, maxSelect = 2, list, placeholder, hasError, errorMsg, tooltip }) => {
    // const [industry, setIndustry] = useState([])

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label><MHToolTip tooltip={tooltip} />
            </div>
            <AsyncSelect
                {...field}
                loadOptions={loadOptions}
                cacheOptions
                isMulti
                defaultOptions
                formatOptionLabel={formatOptionLabel}
                // onChange={(newValue) => {
                //     setIndustry(newValue)
                // }}
                styles={selectStyles}
                isOptionDisabled={() => field.value.length >= maxSelect}
                placeholder={"select max 2 location"}
            />
            {/* {hasError && (
                <p className='text-sm text-red-500'>{errorMsg}</p>
            )} */}
        </div>
    );
}

const filterIndustries = (inputValue) => {
    // add logic for creating new array list of industries 
    let newList = []
    industriesList.forEach((item) => {
        item.children.forEach(item1 => {
            item1.children.forEach(item2 => {
                if (item2.title.toLowerCase().includes(inputValue.toLowerCase()))
                    newList.push(item2)
            })
        })
    });
    industriesList.forEach((item) => {
        item.children.forEach(item1 => {
            if (item1.title.toLowerCase().includes(inputValue.toLowerCase()))
                newList.push(item1)
        })
    });
    industriesList.forEach((item) => {
        if (item.title.toLowerCase().includes(inputValue.toLowerCase()))
            newList.push(item)
    }
    );
    return (newList.map(finalItem => ({ ...finalItem, value: finalItem.title })))
};

const loadOptions = (inputValue, callback) => {
    callback(filterIndustries(inputValue));
};


const formatOptionLabel = ({ title, children }) => (
    <div>
        <div>{title}</div>
    </div>
);

export default IndustrySelect