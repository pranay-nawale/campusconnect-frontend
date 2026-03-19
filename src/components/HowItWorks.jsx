function HowItWorks() {

  const steps = [
    {
      title: "Discover Events",
      description: "Explore hackathons, workshops and fests from colleges around you."
    },
    {
      title: "Register Instantly",
      description: "Sign up for events with just a few clicks."
    },
    {
      title: "Attend & Network",
      description: "Participate, learn new skills and connect with students."
    }
  ];

  return (
    <section className="px-10 mt-28 text-center">

      <h2 className="text-3xl font-bold mb-12">
        How CampusConnect Works
      </h2>

      <div className="grid md:grid-cols-3 gap-10">

        {steps.map((step, index) => (

          <div
            key={index}
            className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition"
          >

            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-600 mx-auto mb-6 text-xl font-bold">
              {index + 1}
            </div>

            <h3 className="text-xl font-semibold">
              {step.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {step.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;