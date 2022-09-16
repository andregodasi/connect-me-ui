import React from 'react';

export const EventSmallCard: React.FC<{
  uuid?: string;
  name: string;
  img?: string;
}> = ({
  uuid,
  name,
  img = 'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
}) => {
  return (
    <div key={uuid} className="group relative">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 relative">
        <img src={img} alt={name} className="object-cover object-center" />
        <div
          className="absolute bottom-0 right-0 left-0 top-0 flex h-full w-full items-end p-4 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
            Veja mais!
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
        <h3>
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </a>
        </h3>
      </div>
      <p className="mt-1 text-sm text-gray-500">Tecnology</p>
    </div>
  );
};
