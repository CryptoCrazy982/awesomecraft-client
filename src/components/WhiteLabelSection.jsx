import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WhiteLabelSection() {
  return (
    <section className="relative w-full bg-gradient-to-r from-orange-50 via-amber-50 to-white text-gray-800 py-10 overflow-hidden">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 gap-10">
        
        {/* 📝 Left Text Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Start{" "}
            <span className="text-yellow-400">Selling</span> Stunning{" "}
            <span className="text-yellow-400">Invitations</span> Today
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mt-3">
            White-Label Simplicity.
          </h3>

          <p className="text-base md:text-lg text-black-100 mt-5 leading-relaxed max-w-xl">
            Offer personalized invitations and designs under your own brand with
            our powerful white-label solution.
          </p>

          <Link
            to="/whitelabel"
            className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Start Now
          </Link>
        </motion.div>

        {/* 💻 Right Illustration */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://invitecrafter.com/images/img/invitecarfter-reseller-landing.webp"
            alt="White Label Marketing"
            className="w-[90%] md:w-[80%] lg:w-[70%] drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* ✨ Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full -translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-400/20 blur-3xl rounded-full translate-x-10 translate-y-10" />
    </section>
  );
}
