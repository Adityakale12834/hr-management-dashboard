import React from "react";
import { motion } from "framer-motion";

function Testimonials() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child's animation
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="relative py-5 bg-yellow-50 sm:py-16 lg:py-24 mx-5 my-5 rounded-2xl"
    >
      <div className="mx-auto w-full">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part is in view
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            What our customers say
          </h2>
          <motion.p
            className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600"
            variants={fadeInUp}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }} // Triggers when any part of the grid is in view
          variants={staggerContainer}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <motion.div
              key={index}
              className="overflow-hidden bg-white rounded-md"
              variants={cardVariants}
            >
              <div className="px-5 py-6">
                <div className="flex items-center justify-between">
                  <img
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    src={`https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-${
                      index + 1
                    }.jpg`}
                    alt=""
                  />
                  <div className="min-w-0 ml-3 mr-auto">
                    <p className="text-base font-semibold text-black truncate">
                      {
                        [
                          "Darrell Steward",
                          "Leslie Alexander",
                          "Jenny Wilson",
                          "Kristin Watson",
                          "Guy Hawkins",
                          "Marvin McKinney",
                          "Annette Black",
                          "Floyd Miles",
                        ][index]
                      }
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {
                        [
                          "@darrels",
                          "@lesslie",
                          "@jennywilson",
                          "@kristinwatson2",
                          "@jennywilson",
                          "@darrels",
                          "@darrels",
                          "@darrels",
                        ][index]
                      }
                    </p>
                  </div>
                  <a href="#" title="" className="inline-block text-sky-500">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                    </svg>
                  </a>
                </div>
                <blockquote className="mt-5">
                  <p className="text-base text-gray-800">
                    {[
                      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save. #another",
                      "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users. #Celebration",
                      "This is a top quality product. No need to think twice before making it live on web. #make_it_fast",
                      "Finally, I’ve found a template that covers all bases for a bootstrapped startup. We were able to launch in days, not months. #Celebration",
                      "This is a top quality product. No need to think twice before making it live on web. #make_it_fast",
                      "With Celebration, it’s quicker with the customer, the customer is more ensured of getting exactly what they ordered, and I’m all for the efficiency. #dev #tools",
                      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save. #another",
                      "My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save. #Celebration",
                    ][index]
                      .split(" ")
                      .map((word, i) => (
                        <span
                          key={i}
                          className={word.startsWith("#") ? "text-sky-500" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/100" />
      <motion.button
        className="absolute z-30 bg-black px-10 py-3 text-white rounded-md bottom-40 left-3/11 sm:left-5/12 hover:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
        variants={fadeInUp}
      >
        Read More
      </motion.button>
    </section>
  );
}

export default Testimonials;
