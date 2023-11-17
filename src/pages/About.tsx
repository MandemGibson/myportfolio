// import mypic from "../assets/images/My Profile.jpg";

function About() {
  return (
    <div className="m-28 flex items-center">
      <div className="rounded-lg bg-blue-500 w-3/8 h-98 relative">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQHQatMXvC3qRQ/profile-displayphoto-shrink_800_800/0/1674306316434?e=2147483647&v=beta&t=WmQc3xePt8cmLY4XNvdKVKYtLlBxwL-aYGnRztXFnpg"
          alt=""
          className="w-full h-full rounded-lg"
        />
        <div className="absolute flex bg-white h-20 w-56 top-0 right-0 -mt-7 -mr-20 rounded-lg border border-gray-300 shadow-inner items-center justify-center p-10">
          <div className="flex items-center">
            <p className="text-6xl font-bold text-blue-500 flex items-center">
              1<span className="text-5xl">+</span>
            </p>
            <p className="text-sm font-semibold text-gray-600 ml-3">
              Years Of Experience
            </p>
          </div>
        </div>
        <div className="absolute rounded-full p-1 bg-white w-44 h-40 bottom-0 right-0 -mr-14 -mb-7">
          <img
            src="https://media.licdn.com/dms/image/D4E22AQE9g8syqed1GA/feedshare-shrink_2048_1536/0/1682189771052?e=2147483647&v=beta&t=R-KUmsiCqQ45jcnitdr5gvnoIXgJ_8K2P8jFtK-WKZA"
            alt="Certificate"
            className="rounded-full bg-blue-800 w-full h-full"
          />
        </div>
      </div>
      <div className="ml-32 flex-col w-1/2">
        <h3 className="text-sm text-blue-600 font-bold">Who am I?</h3>
        <h2 className="text-4xl font-bold text-gray-800">
          About Gibson Cudjoe
        </h2>
        <div className="border-2 border-blue-600 w-8 mb-5" />
        <p className="w-full flex-wrap whitespace-pre-wrap">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          totam vitae laborum aspernatur, ipsam quibusdam cumque quidem sunt?
          Impedit, nam magni. Et architecto nesciunt quo deserunt beatae sunt.
          Quisquam, ipsam. Odit quisquam iste beatae repellendus dolor labore,
          cupiditate, tempore eaque nihil fuga repudiandae, reprehenderit
          tempora in voluptas sequi distinctio rem dolore fugiat et eius facere!
          Vel, repellat quos. Vel, consequatur.
        </p>
        <button className="mt-8 bg-blue-500 px-5 py-3 uppercase text-sm text-white font-semibold">
          More About Me
        </button>
      </div>
    </div>
  );
}

export default About;
