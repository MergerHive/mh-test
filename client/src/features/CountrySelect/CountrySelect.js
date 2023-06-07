import React, { useState } from 'react'
import Select from 'react-select';
import cc from 'country-code'
import localCurrency from 'locale-currency'
import { useSelector, useDispatch } from 'react-redux'
import { setCountry } from '../../app/configSlice';

const selectStyles = {
    control: (provided) => ({
        ...provided,
        minWidth: 240,
        margin: 8,
    }),
    option: (styles, { data, isDisabled, isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? "#d1d5db" : "white",
        color: "black",
        fontSize: "14px"
    }),
    menu: () => ({
        boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)'
    }),
};


const CountrySelect = () => {
    const [isOpen, setIsOpen] = useState(false);

    const country = useSelector(state => state.config.country)
    const dispatch = useDispatch()

    const getCountriesList = () => {
        let shortCountry = Object.keys(cc.countries);
        let countryArray = shortCountry.map((shortName) => (cc.countries[shortName]))
        let countryCurrencyArray = countryArray.map(item => ({ ...item, currency: localCurrency.getCurrency(item.alpha2) }))
        return countryCurrencyArray
    }

    const countriesList = getCountriesList()

    return (
        <div className='mx-2'>
            <Dropdown
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                target={
                    <button
                        onClick={() => setIsOpen((prev) => !prev)} className='cursor-pointer'
                    >
                        <div className='flex gap-2'>
                            <span className={`fi fi-${country.alpha2.toLowerCase()}`} />
                            <div className='text-white text-sm'>[{country.currency}]</div>
                        </div>
                    </button>
                }
            >
                <Select
                    autoFocus
                    backspaceRemovesValue={false}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    formatOptionLabel={formatOptionLabel}
                    isClearable={false}
                    menuIsOpen
                    filterOption={filterOptions}
                    onChange={(newValue) => {
                        localStorage.setItem('countryDetails', JSON.stringify(newValue));
                        dispatch(setCountry(newValue))
                        setIsOpen(false);
                    }}
                    options={countriesList}
                    placeholder="Search Country"
                    styles={selectStyles}
                    tabSelectsValue={false}
                    value={country}
                />
            </Dropdown>
        </div>
    );
}

const filterOptions = (option, inputValue) => {
    const { data } = option;
    return data.name.toLowerCase().includes(inputValue.toLowerCase())
};


const formatOptionLabel = ({ name, alpha2, alpha3, isoNumeric }) => (
    <div className='flex gap-2'>
        <span className={`fi fi-${alpha2.toLowerCase()}`} />
        <div>{name}</div>
    </div>
);


const Dropdown = ({
    children,
    isOpen,
    target,
    onClose,
}) => (
    <div css={{ position: 'relative' }}>
        {target}
        {isOpen ? <div className='bg-white rounded mt-2 absolute z-[2]'>{children}</div> : null}
        {isOpen ? <div className='bottom-0 left-0 top-0 right-0 fixed z-[1]' onClick={onClose} /> : null}
    </div>
);

export default CountrySelect