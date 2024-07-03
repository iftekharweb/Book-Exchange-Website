import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-8 bg-white text-gray-900">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Welcome to BookMark! This Privacy Policy describes how we collect, use, and share your personal information when you use our web app. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          When you use BookMark, we may collect the following types of information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Personal Information:</strong> Such as your name, email address, phone number, and date of birth.</li>
          <li><strong>Account Information:</strong> Including your username, password, and profile details.</li>
          <li><strong>Book Exchange Information:</strong> Details about the books you list or exchange, including their titles, authors, and conditions.</li>
          <li><strong>Usage Data:</strong> Information about how you use our app, such as the pages you visit and the actions you take.</li>
          <li><strong>Location Data:</strong> If you choose to share your location with us, we may collect and use this information to improve our services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, improve, and personalize our services. This includes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Facilitating book exchanges and managing your account.</li>
          <li>Communicating with you about your account, exchanges, and other updates.</li>
          <li>Improving our platform by analyzing how you use our services.</li>
          <li>Providing customer support and responding to your inquiries.</li>
          <li>Sending you promotional messages and updates, if you have opted to receive them.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. However, we may share your information with:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Service Providers:</strong> Companies that help us operate and improve our app, such as hosting providers and payment processors.</li>
          <li><strong>Legal Obligations:</strong> Authorities if required by law or to protect our rights and users' safety.</li>
          <li><strong>Business Transfers:</strong> In connection with any merger, sale of assets, or acquisition of all or a portion of our business by another company.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Security of Your Information</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet or email transmission is ever fully secure or error-free, so please take special care in deciding what information you send to us in this way.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting us directly. You may also choose to opt-out of receiving promotional emails from us at any time.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We use cookies and similar technologies to enhance your experience on our platform. Cookies are small data files stored on your device that help us understand how you use our app and improve your experience. You can control the use of cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p className="mb-4">
          Our app may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our app and updating the effective date at the end of this policy. Your continued use of our app after any changes constitutes your acceptance of the new policy.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@bookmark.com" className="text-blue-600 hover:underline">support@bookmark.com</a>.
        </p>

        <p className="mt-8 text-gray-500">
          Last updated: June 27, 2024
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
