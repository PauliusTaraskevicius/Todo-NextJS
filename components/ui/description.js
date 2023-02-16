import CreateTaskForm from "../Posts/CreatePost";

function Description({ feed }) {
  return (
    <div>
      <div className="container mx-auto flex flex-col items-center py-12 sm:py-24 mt-2">
        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-7 md:leading-10">
            <span className="text-blue-900">Accelerate</span> Your Day by
            Creating Various
            <span className="text-blue-900"> Todo</span> list
          </h1>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-300 font-normal text-center text-sm sm:text-lg">
            A very simple, demo version of Todo application.All your tasks are saved
            into database and you can freely leave without fear of loosing data.
          </p>
        </div>

        <CreateTaskForm feed={feed} />
      </div>
    </div>
  );
}

export default Description;
