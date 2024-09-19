interface DetailsSectionProps {
  data: any
}

const DetailsSection = ({ data }: DetailsSectionProps) => {
  return (
    <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden">
      <img src="/assets/images/bg-with-spiral-curves.png" alt="" className="absolute inset-0 w-full h-full" />
      <div className="absolute w-full h-full flex justify-center items-center xl:justify-end">
        <img src="/assets/images/fortress-yellow.svg" alt="" className="h-100 xl:mr-50" />
      </div>
      <div className="relative flex flex-col items-center xl:items-start text-center xl:text-left px-20 sm:px-30 py-24 xl:pt-30">
        <div>
          {/* <p className="text-20 sm:text-24 text-sf-gray-300 font-bold leading-16">Check-In Challenge</p> */}
          <p className="text-20 sm:text-24 text-sf-gray-300 font-bold leading-16">{data?.title}</p>
          <p className="text-12 sm:text-14 text-sf-neutral-300 font-poppins leading-20 mt-8">{data?.match?.title}</p>
        </div>
        <div className="flex items-center mb-10 xl:mb-0 mt-12">
          <div className="h-full flex flex-col justify-between">
            <p className="text-10 text-sf-zinc-400 font-poppins">{data?.isUpcoming ? 'Starts On' : 'Expires On'}</p>
            <p className="text-20 text-sf-gray-300 leading-30">{data?.isUpcoming ? data?.start : data?.end}</p>
          </div>
          <div className="w-px h-24 xl:h-40 bg-white/50 mx-10 sm:mx-22" />
          <div className="h-full flex flex-col justify-between">
            <p className="text-10 text-sf-zinc-400 font-poppins">Kudos Needed</p>
            <p className="text-24 text-sf-gray-300 leading-30">{data?.eligbleKudos}</p>
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
