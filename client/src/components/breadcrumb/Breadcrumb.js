import React from 'react';

const Breadcrumb = ({ items = [] }) => (
    <nav className="flex items-center text-sm font-medium px-3 py-2">
        {items.map((item, index) => (
            <React.Fragment key={item.label}>
                <a href={item.url} className="text-gray-500 hover:text-gray-700">
                    {item.label}
                </a>
                {index < items.length - 1 && (
                    <span className="mx-2 text-gray-400">/</span>
                )}
            </React.Fragment>
        ))}
    </nav>
);

export default Breadcrumb;