import React from 'react'

const InfoRow = ({ title, value }) => {
    const classSpec = title % 2 === 0 ? "my-2" : "bg-gray-100 py-2 my-2";
    return (
        <div className={classSpec}>
            <div className="grid grid-cols-3 gap-2">
                <p className="flex items-center justify-center font-bold">{title}</p>
                <p className="col-span-2">{value}</p>
            </div>
        </div>
    );
};

export default InfoRow