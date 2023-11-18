import { Cloud } from "@mui/icons-material";
import ServiceBox from "../components/ServiceBox";
import TitAndSub from "../components/TitAndSub";

const iconStyle = {
  fontSize: "5rem",
  color: "blue",
};

function Services() {
  return (
    <div className="bg-gray-100 h-min">
      <div className="mx-28 pt-8">
        <TitAndSub title="Services" subtitle="Explore My Best Services" />
        <div className="grid grid-cols-3">
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
          <ServiceBox
            icon={<Cloud style={iconStyle} />}
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
          />
        </div>
        <div className="pt-36">
          <TitAndSub title="Working Progress" subtitle="How Do I Work?" />
        </div>
      </div>
    </div>
  );
}

export default Services;
