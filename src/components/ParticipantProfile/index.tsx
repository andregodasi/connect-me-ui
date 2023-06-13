import Image from 'next/future/image';
import participantImage from '@/images/avatars/avatar-2.png';

export default function ParticipantProfile({ name }: { name: string }) {
  return (
    <a href="#" className="group block flex-shrink-0">
      <div className="flex flex-col items-center">
        <div>
          <Image
            className="inline-block h-12 w-12 rounded-full"
            src={participantImage}
            alt={name}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name}
          </p>
        </div>
      </div>
    </a>
  );
}
