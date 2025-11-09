import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'Contact Us - Pulse LS',
  description: 'Get in touch with Pulse LS. We value your feedback and inquiries.',
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Send us a message!"
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-xl">
                  <FiMail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">newsroom@pulsels.com</p>
                  <p className="text-gray-600">advertising@pulsels.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-xl">
                  <FiPhone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+266 2232 2255</p>
                  <p className="text-gray-600">+266 5858 5858</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-xl">
                  <FiMapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-600">123 Pioneer Road</p>
                  <p className="text-gray-600">Maseru, Lesotho</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Press Releases</h2>
            <p className="text-gray-700 mb-4">
              For press releases and media inquiries, please email our newsroom at:
            </p>
            <a href="mailto:press@pulsels.com" className="text-primary-600 hover:text-primary-700 font-semibold">
              press@pulsels.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}