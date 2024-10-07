import MemberList from './MemberList';
import useModalStore from '@/store/useModalStore';
import InviteMember from '@/components/common/modal/InviteMember';
import { useGroupsQuery } from '@/queries/group/group';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/authStore';
import { useUsersQuery } from '@/queries/user/user';

export default function Member() {
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();
  const { groupId } = router.query;

  const numericGroupId: number = groupId ? Number(groupId) : 0;

  const handleOpenInviteModal = () => {
    openModal((close) => (
      <InviteMember close={close} groupId={numericGroupId} />
    ));
  };

  const {
    data: groupResponse,
    isLoading,
    error,
  } = useGroupsQuery(numericGroupId);

  const groupData = groupResponse?.data;

  const { accessToken } = useUserStore();

  const { data: userData } = useUsersQuery(accessToken);

  const isAdmin =
    groupData && userData
      ? groupData.members.some(
          (member) =>
            member.userId === userData.data.id && member.role === 'ADMIN',
        )
      : false;

  if (isLoading) return <div>로딩 중...</div>;

  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!groupData || groupData.members.length === 0) {
    return <div>멤버가 없습니다.</div>;
  }

  // 관리자는 항상 첫 번째에 위치 할 수 있게 하는 로직
  const adminMembers = groupData.members.filter(
    (member) => member.role === 'ADMIN',
  );

  const regularMembers = groupData.members.filter(
    (member) => member.role !== 'ADMIN',
  );

  const sortedMembers = adminMembers.concat(regularMembers);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <strong className="font-medium-16 text-text-primary">멤버</strong>
          <span className="font-regular-16 text-text-default">
            ({groupData.members.length}명)
          </span>
        </div>
        {isAdmin && (
          <button
            className="font-regular-14 text-brand-primary"
            onClick={handleOpenInviteModal}
          >
            + 새로운 멤버 초대하기
          </button>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {sortedMembers.map((member) => (
          <MemberList key={member.userId} member={member} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}
