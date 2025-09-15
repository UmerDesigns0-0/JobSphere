function TCs() {
  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <div className="prose text-gray-500">
              <p>
                By accessing and using our job listing platform, you agree to comply with these Terms of Service. 
                These terms apply to both employers posting job opportunities and candidates applying for positions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">2. Use of Platform</h2>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6">
              <ul className="space-y-4 dark:text-gray-400">
                <li className="flex gap-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Employers may post genuine job opportunities with accurate information regarding role, salary, and requirements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Candidates may apply to jobs in good faith and must not submit false or misleading information.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">3. Disclaimer</h2>
            <div className="dark:bg-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Our platform does not guarantee employment, job offers, or candidate suitability. 
                    We are not responsible for the accuracy of job postings or application details provided by users.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">4. Limitations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Prohibited Use</h3>
                <p className="dark:text-gray-400">
                  Users must not post fraudulent jobs, spam applications, or misuse employer/candidate data.
                </p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Liability</h3>
                <p className="dark:text-gray-400">
                  We shall not be liable for any hiring decisions, employment disputes, or damages arising from use of the platform.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">5. Revisions</h2>
            <div className="prose text-gray-500">
              <p>
                These terms may be updated at any time without notice. 
                Continued use of the platform after changes indicates acceptance of the revised Terms of Service.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TCs;
