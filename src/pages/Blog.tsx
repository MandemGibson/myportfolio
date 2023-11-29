import BlogCard from "../components/BlogCard";
import {
  DevicesOutlined,
  PrintOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

function Blog() {
  return (
    <section id="blog" className="ml-28 mr-28 grid md:grid-cols-3">
      <BlogCard
        title="Full Website Creation"
        description="I can build any kind of website for your business, portfolio, company, eCommerce store, blog, LMS, booking, etc"
        icon={<SettingsOutlined style={{ fontSize: "48px", color: "blue" }} />}
      />
      <BlogCard
        title="Maintenance & Support"
        description="Provide maintenance and support services after project delivery to keep the website up-to-date and error-free"
        icon={<PrintOutlined style={{ fontSize: "48px", color: "blue" }} />}
      />
      <BlogCard
        title="Friendly Consultation"
        description="Offer consultation to improve existing website performance or brainstorm about new project requirements"
        icon={<DevicesOutlined style={{ fontSize: "48px", color: "blue" }} />}
      />
    </section>
  );
}

export default Blog;
