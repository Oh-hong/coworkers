import emptyTeamImage from '@/assets/image/task/emptyTeam.svg';
import Image from 'next/image';
import Button from '../common/button';
import useModalStore from '@/store/useModalStore';
import TeamForm from '../common/modal/TeamForm';
import CustomInputModal from '../common/modal/CustomInputModal';

export default function EmptyTeam() {
  const openModal = useModalStore((state) => state.openModal);

  const handleCreateTeamModal = () => {
    openModal((close) => (
      <TeamForm close={close} groupId={0} isEditMode={false} />
    ));
  };

  // TODO: 팀 참여하기 모달 연동

  return (
    <div className="m-auto mt-[186px] flex flex-col items-center justify-center md:mt-[272px] lg:mt-[212px]">
      <Image
        src={emptyTeamImage}
        alt="소속된 팀이 없습니다."
        width={312}
        height={98}
        className="lg:h-[255]px mb-8 md:mb-12 md:h-[164px] md:w-[520px] lg:mb-12 lg:w-[810px]"
      />
      <div className="flex flex-col items-center gap-y-1">
        <p className="font-medium-14 text-text-default">
          아직 소속된 팀이 없습니다.
        </p>
        <p className="-14 font-medium text-text-default">
          팀을 생성하거나 팀에 참여해보세요.
        </p>
      </div>
      <div className="mt-12 flex w-[186px] flex-col gap-y-2 md:mt-20 lg:mt-20">
        <Button
          size="large"
          font="font-semibold-14"
          appearance="solid"
          children="팀 생성하기"
          fullWidth={true}
          onClick={handleCreateTeamModal}
        />
        <Button
          size="large"
          font="font-semibold-14"
          appearance="outlined"
          children="팀 참여하기"
          fullWidth={true}
          className="bg-transparent"
        />
      </div>
    </div>
  );
}
