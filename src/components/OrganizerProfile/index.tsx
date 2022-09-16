export default function OrganizerProfile() {
  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              className="h-16 w-16 rounded-full"
              src="https://media-exp1.licdn.com/dms/image/C4D03AQGxOMYvdCao3A/profile-displayphoto-shrink_200_200/0/1661188755302?e=1666828800&v=beta&t=Iz0p8qAeiT23V3PcGlWFb63H19J4rrbyAxmIYVWidJ0"
              alt=""
            />
            <span
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            />
          </div>
        </div>
        {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
        <div className="pt-1.5">
          <h1 className="text-2xl font-bold text-gray-900">André Gonçalves</h1>
          <p className="text-sm font-medium text-gray-500">
            <a href="#" className="text-gray-900">
              Front End Developer
            </a>{' '}
          </p>
        </div>
      </div>
      {/*  <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Disqualify
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Advance to offer
        </button>
      </div> */}
    </div>
  );
}
