export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using UAE Digital Solutions' services, you accept and agree 
              to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Services</h2>
            <p className="mb-4">UAE Digital Solutions provides:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Website design and development</li>
              <li>AI automation solutions</li>
              <li>Digital marketing services</li>
              <li>SEO optimization</li>
              <li>E-commerce solutions</li>
              <li>Consulting services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Client Responsibilities</h2>
            <p className="mb-4">As a client, you agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Provide timely feedback and approvals</li>
              <li>Ensure all provided content doesn't infringe on third-party rights</li>
              <li>Make timely payments as per agreed terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>50% deposit required before project commencement</li>
              <li>Balance due upon project completion</li>
              <li>Late payments may incur additional charges</li>
              <li>All fees are non-refundable unless otherwise stated</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              Upon full payment, clients receive full ownership rights to the final 
              deliverables. UAE Digital Solutions retains the right to showcase the 
              work in portfolios and marketing materials unless otherwise agreed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Confidentiality</h2>
            <p className="mb-4">
              Both parties agree to keep confidential all proprietary information 
              received from the other party during the course of the project.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              UAE Digital Solutions shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use or 
              inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
            <p className="mb-4">
              Either party may terminate the agreement with 30 days written notice. 
              Upon termination, client shall pay for all work completed up to the 
              termination date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="mb-4">
              These terms shall be governed by and construed in accordance with the 
              laws of the United Arab Emirates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p className="mb-4">
              For any questions regarding these terms, please contact us at:
            </p>
            <ul className="list-none mb-4">
              <li>Email: info@uaedigitalsolution.com</li>
              <li>Phone: +971 50 123 4567</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}