import React from 'react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default CategoryCard;