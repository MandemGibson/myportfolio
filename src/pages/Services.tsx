import { Cloud, HandshakeOutlined } from "@mui/icons-material";
import ServiceBox from "../components/ServiceBox";
import TitAndSub from "../components/TitAndSub";
import WorkProgress from "../components/WorkProgress";

const serviceBoxIcon = {
  fontSize: "5rem",
  color: "#0176d2",
};

const progressBoxIcon = {
  fontSize: "3.5rem",
  color: "#0176d2",
};

function Services() {
  return (
    <>
      <section id="service" className="bg-gray-100 h-min">
        <div className="mx-28 pt-8">
          {/*Services start*/}
          <TitAndSub title="Services" subtitle="Explore My Best Services" />
          <div className="grid grid-cols-3">
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
            <ServiceBox
              icon={<Cloud style={serviceBoxIcon} />}
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
            />
          </div>
          {/*Services end*/}

          {/*Working Progress start*/}
          <div className="pt-36 pb-14">
            <TitAndSub title="Working Progress" subtitle="How Do I Work?" />
            <div className="grid grid-cols-3 mx-auto">
              <WorkProgress
                num={1}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
              <WorkProgress
                num={2}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
              <WorkProgress
                num={3}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
              <WorkProgress
                num={4}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
              <WorkProgress
                num={5}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
              <WorkProgress
                num={6}
                icon={<HandshakeOutlined style={progressBoxIcon} />}
                title="Project Discussion"
                description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia odit quidem voluptate aspernatur repellat pariatur"
              />
            </div>
          </div>
          {/*Working Progress end*/}
        </div>
      </section>
    </>
  );
}

export default Services;
