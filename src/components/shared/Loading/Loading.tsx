import { FC } from 'react';

type LoadingSize = 'small' | 'large';

interface LoadingProps {
  size: LoadingSize;
}

const sizesMap = new Map<LoadingSize, number>();
sizesMap.set('small', 24);
sizesMap.set('large', 48);

const DEFAULT_SIZE = 24;

const Loading: FC<LoadingProps> = props => {
  const { size } = props;

  return (
    <svg
      className="animate-spin -ml-1 mr-3 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={sizesMap.get(size) ?? DEFAULT_SIZE}
      height={sizesMap.get(size) ?? DEFAULT_SIZE}
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loading;
