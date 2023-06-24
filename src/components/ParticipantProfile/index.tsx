import Image from 'next/image';
import { User } from '@/shared/interfaces/IUser';
import { getInitials } from '@/shared/utils/transforms/text';
import { Avatar } from 'antd';
import { stringToHslColor } from '@/shared/utils/transforms/rgb';
import Link from 'next/link';

export default function ParticipantProfile({
  participant,
}: {
  participant: User | undefined;
}) {
  return (
    <Link
      title={participant?.name}
      href={`/profile/${participant?.uuid}`}
      className="group block flex-shrink-0"
    >
      <div className="flex flex-col items-center">
        <div>
          {participant?.photoUrl ? (
            <Image
              width={200}
              height={200}
              className="inline-block h-12 w-12 rounded-full"
              src={participant.photoUrl}
              alt={participant?.name || ''}
            />
          ) : (
            <Avatar
              className="border-2 shadow"
              size={48}
              style={{
                backgroundColor: stringToHslColor(
                  participant?.name || '',
                  60,
                  70,
                ),
                color: stringToHslColor(participant?.name || '', 60, 95),
                borderColor: stringToHslColor(participant?.name || '', 60, 95),
                fontWeight: 600,
              }}
            >
              {getInitials(participant?.name)}
            </Avatar>
          )}
        </div>
        <div className="ml-3">
          <p className="ellipis-1 text-sm font-medium text-gray-700  group-hover:text-gray-900">
            {participant?.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
