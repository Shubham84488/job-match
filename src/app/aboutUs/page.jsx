import React from "react";

const AboutUs = () => {
  return (
    <div className="mx-auto my-4 p-6 text-gray-800 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">About Us</h1>
      <p className="text-lg text-center text-gray-600">
        Welcome to <span className="font-semibold text-blue-500">JOBNEW</span> – Your Trusted Career Partner.
      </p>

      <section className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold text-blue-500">JOBNEW</span>, we bridge the gap between job seekers and employers,
          offering a <span className="font-semibold">reliable, secure, and efficient</span> job marketplace. Our goal is to make job hunting and recruitment seamless.
        </p>
      </section>

      <section className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Why Trust Us?</h2>
        <ul className="mt-3 list-disc pl-6 space-y-3 text-gray-700">
          <li><strong className="text-blue-500">✅ Verified Employers & Authentic Jobs:</strong> Every job and company is thoroughly vetted.</li>
          <li><strong className="text-blue-500">✅ Secure & Private Job Search:</strong> Advanced security ensures your data remains safe.</li>
          <li><strong className="text-blue-500">✅ Proven Track Record:</strong> Thousands of successful job placements make us a trusted choice.</li>
          <li><strong className="text-blue-500">✅ AI-Powered Job Recommendations:</strong> Our intelligent system matches you with the best jobs.</li>
          <li><strong className="text-blue-500">✅ 24/7 Customer Support:</strong> Our team is always ready to assist you.</li>
        </ul>
      </section>

      <section className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Join Us Today!</h2>
        <p className="text-gray-700 leading-relaxed">
          Whether you're looking for a job or hiring top talent, <span className="font-semibold text-blue-500">JOBNEW</span> is the perfect place to start.
          Sign up today and take the next step toward success!
        </p>
        <div className="mt-4 text-gray-600">
          <p>📩 <strong>Contact Us:</strong>{" "} <span className="font-bold text-blue-800"> jobnewnow@gmail.com </span></p>
          <p>🌐 <strong>Website:</strong> <a href="[Your Website URL]" className="text-blue-500 hover:underline">[Your Website URL]</a></p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
