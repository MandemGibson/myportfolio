import ImgCard from "../components/ImgCard";
import ProjectCategory from "../components/ProjectCategory";
import TitAndSub from "../components/TitAndSub";
import mypic from "../assets/images/My Profile.jpg";
import TestimonialCard from "../components/TestimonialCard";

function Portfolio() {
  return (
    <section id="portfolio" className="ml-28 mr-28">
      <TitAndSub title="Latest Works" subtitle="Explore Recent Projects" />
      <div className="flex items-center justify-center space-x-3 mb-6">
        <ProjectCategory item="All" />
        <ProjectCategory item="E-commerce" />
        <ProjectCategory item="Landing Page" />
        <ProjectCategory item="Education" />
      </div>
      <div className="grid lg:grid-cols-4 gap-5 lg:p-16 lg:pt-0">
        <ImgCard image={mypic} />
        <ImgCard image={""} />
        <ImgCard image={""} />
        <ImgCard image={""} />
        <ImgCard image={""} />
      </div>
      <div className="flex justify-center">
        <button className="w-max h-min py-1 px-3 border-2 border-gray-500 rounded font-semibold text-sm text-gray-700 underline">
          Load More
        </button>
      </div>
      <div className="mt-5">
        <TitAndSub title="Client's Review" subtitle="Testimonials" />
        {/* <h1>&#9733;</h1> */}
        <div className="flex items-center justify-center space-x-3 flex-wrap">
          <TestimonialCard
            rating={[<h1>&#9733;</h1>, <h1>&#9733;</h1>, <h1>&#9733;</h1>]}
            testimonial="He is a good developer and works with time"
            name="John Doe"
            occupation="Software Dev"
          />
          <TestimonialCard
            rating={[<h1>&#9733;</h1>, <h1>&#9733;</h1>, <h1>&#9733;</h1>]}
            testimonial="He is a good developer and works with time"
            name="John Doe"
            occupation="Software Dev"
          />
          <TestimonialCard
            rating={[<h1>&#9733;</h1>, <h1>&#9733;</h1>, <h1>&#9733;</h1>]}
            testimonial="He is a good developer and works with time"
            name="John Doe"
            occupation="Software Dev"
          />
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
