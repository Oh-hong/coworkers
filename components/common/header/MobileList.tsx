import Link from 'next/link';
import teams from './mock.json';

export default function MobileList() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-14 z-11 bg-bg-tertiary md:hidden lg:hidden">
      <div className="flex h-full w-full flex-col items-start justify-start gap-y-6 p-6">
        {teams.map((team, index) => (
          <Link
            href={`/team/${index}`}
            key={index}
            className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
          >
            {team.name}
          </Link>
        ))}
        <Link
          href="/boards"
          className="font-medium-14 block w-full rounded-md p-4 text-text-primary hover:bg-gray-500"
        >
          자유게시판
        </Link>
      </div>
    </div>
  );
}
