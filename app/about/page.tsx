import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'

export const metadata = {
  title: 'About Us - Pulse LS',
  description: 'Learn more about Pulse LS, our mission, and our team of dedicated journalists.',
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <PageHeader
        title="About Pulse LS"
        description="Your trusted source for in-depth news and analysis from Lesotho"
      />

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Pulse LS, we believe in the power of truthful, unbiased journalism to inform, educate, and empower our community. Our mission is to deliver accurate, timely, and relevant news that matters to the people of Lesotho.
          </p>
          <p className="text-lg text-gray-700">
            We strive to maintain the highest standards of journalistic integrity while embracing innovation in digital media to reach and engage with our audience effectively.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Truth</h3>
          <p className="text-gray-700">
            We are committed to honest, accurate reporting and transparency in our journalistic process.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Independence</h3>
          <p className="text-gray-700">
            We maintain editorial independence and are free from political or commercial influence.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Community</h3>
          <p className="text-gray-700">
            We serve our community by highlighting important local issues and giving voice to all perspectives.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-8 text-center text-gray-900">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start space-x-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/team/editor.jpg"
                alt="Editor in Chief"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Victor Oblate</h3>
              <p className="text-primary-600 mb-2">Editor in Chief</p>
              <p className="text-gray-600 text-sm">
                Leading our newsroom with over 15 years of journalism experience.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start space-x-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/team/managing-editor.jpg"
                alt="Managing Editor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Pulane Ellen Makakane</h3>
              <p className="text-primary-600 mb-2">Managing Editor</p>
              <p className="text-gray-600 text-sm">
                Coordinating our coverage and maintaining editorial standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}