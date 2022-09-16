import React from 'react';

const GroupCard: React.FC = ({
  uuid,
  current,
  name,
  description,
  users,
  source = 'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
}: any) => {
  return (
    <a
      href={`/communities/${uuid}`}
      title="Clique para ver todas as informações!"
      className="w-full max-w-sm transition hover:shadow lg:flex lg:max-w-full"
    >
      <div
        className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
        title="Woman holding a mug"
        style={{ backgroundImage: `url(${source})` }}
      ></div>
      <div className="flex w-full flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
        <div className="mb-8">
          <div className="mb-2 text-xl font-bold text-gray-900">{name}</div>
          <p className="ellipis-3 text-base text-gray-700" title={description}>
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="mr-4 h-10 w-10 rounded-full"
            src={source}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="leading-none text-gray-900">
              {users?.[0]?.user?.name}
            </p>
            <p className="text-gray-600">{users?.[0]?.user?.nickname}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GroupCard;
