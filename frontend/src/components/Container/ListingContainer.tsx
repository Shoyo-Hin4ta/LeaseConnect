import React, { ReactNode } from 'react';

interface ListingContainerProps {
    children: ReactNode;
}

const ListingContainer: React.FC<ListingContainerProps> = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
            {children}
        </div>
    );
};

export default ListingContainer;