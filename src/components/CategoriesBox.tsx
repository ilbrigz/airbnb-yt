'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType; // how to add types to react-icons
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams(); // how to get the param object(not string)

  //what are query strings
  //http://localhost:3000/?category=Arctic&test=asdf
  //query strings are category=lake or category=Lake&test=asdf

  //how to check and change params on click ( route change )
  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString()); //query string as string then as object(using qs)
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // remove the query in the updatedQuery
    // we are already in the current url
    // will redirect to label home page ( comment below to disable redirect to home page)
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // covert query object to url
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      {/* how to use component as props */}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
