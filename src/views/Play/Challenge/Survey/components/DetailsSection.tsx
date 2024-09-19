interface DetailsSectionProps {
  data: any
}

const DetailsSection = ({ data }: DetailsSectionProps) => {
  return (
    <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden">
      <img src="/assets/images/bg-with-spiral-curves.png" alt="" className="absolute inset-0 w-full h-full" />
      <div className="absolute w-full h-full flex justify-center items-center xl:justify-end">
        <img src="/assets/images/user-check-yellow.svg" alt="" className="h-120 xl:mr-50" />
      </div>
      <div className="relative flex flex-col items-center xl:items-start px-20 sm:px-30 py-24 xl:pt-30">
        <div>
          <p className="text-20 sm:text-24 text-sf-gray-300 font-bold text-center xl:text-left">{data?.title}</p>
          <p className="text-12 sm:text-14 text-sf-neutral-300 font-poppins leading-20 mt-8">{data?.match?.title}</p>
        </div>
        <div className="flex items-center mb-10 xl:mb-0 mt-12">
          <div className="h-full flex flex-col justify-between">
            <p className="text-10 text-sf-zinc-400 font-poppins">{data?.isUpcoming ? 'Starts On' : 'Expires On'}</p>
            <p className="text-14 xs:text-20 text-sf-gray-300 xs:leading-30">
              {data?.isUpcoming ? data?.start : data?.end}
            </p>
          </div>
          <div className="w-px h-24 xl:h-40 bg-white/50 mx-10 sm:mx-22" />
          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
            <img src="/assets/images/decoration.svg" alt="" className="h-18 xs:h-28" />
            <div className="flex flex-col justify-between ml-8 md:ml-12">
              <span className="point-name text-[9px] xl:text-12">Earn</span>
              <span className="point-value font-bold md:text-24 xl:text-28 xs:leading-30">{data?.kudosReward}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center xl:block">
          <span className="text-10 text-sf-zinc-400">Sponsored By</span>
          <img src={data?.sponsor?.logo} alt="" className="h-50 ml-10 xl:ml-0 md:mt-4" />
        </div>
      </div>
    </div>
  )
}

export default DetailsSection
